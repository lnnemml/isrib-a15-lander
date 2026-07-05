import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureOrdersTable } from '@/lib/db';
import { getProduct, getCryptoPrice } from '@/lib/products';
import { createInvoice } from '@/lib/nowpayments';
import { sendToCustomer, sendToAdmin } from '@/lib/resend';
import { buyerConfirmationEmail } from '@/lib/emails/buyer-confirmation';
import { adminNotificationEmail } from '@/lib/emails/admin-notification';
import { Client } from '@upstash/qstash';

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${ts}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      email,
      country,
      productId,
      paymentMethod,
      fbp,
      fbc,
      gaClientId,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
    } = body as {
      firstName: string;
      email: string;
      country: string;
      productId: string;
      paymentMethod: 'crypto' | 'manual';
      fbp?: string;
      fbc?: string;
      gaClientId?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmContent?: string;
    };

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }
    if (!country?.trim()) {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 });
    }
    if (paymentMethod !== 'crypto' && paymentMethod !== 'manual') {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
    }

    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const amountUsd = product.price;
    const amountChargedUsd =
      paymentMethod === 'crypto' ? getCryptoPrice(amountUsd) : amountUsd;

    const orderId = generateOrderId();
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      null;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.isrib-a15.com';

    // Ensure DB table exists
    await ensureOrdersTable();

    // Create NowPayments invoice if crypto
    let invoiceId: string | null = null;
    let invoiceUrl: string | null = null;

    if (paymentMethod === 'crypto') {
      const invoice = await createInvoice({
        orderId,
        amountUsd: amountChargedUsd,
        productName: product.name,
        successUrl: `${siteUrl}/checkout?status=paid&order_id=${orderId}`,
        cancelUrl: `${siteUrl}/checkout?status=cancelled&order_id=${orderId}`,
      });
      invoiceId = invoice.id;
      invoiceUrl = invoice.invoice_url;
    }

    // Save to Neon
    await sql`
      INSERT INTO orders_landing (
        order_id, first_name, email, country,
        product_id, product_name, amount_usd, amount_charged_usd,
        payment_method, payment_status,
        nowpayments_invoice_id, nowpayments_invoice_url,
        utm_source, utm_medium, utm_campaign, utm_content,
        fbp, fbc, ga_client_id, ip_address
      ) VALUES (
        ${orderId}, ${firstName.trim()}, ${email.toLowerCase().trim()}, ${country.trim()},
        ${product.id}, ${product.name}, ${amountUsd}, ${amountChargedUsd},
        ${paymentMethod}, 'pending',
        ${invoiceId}, ${invoiceUrl},
        ${utmSource ?? null}, ${utmMedium ?? null}, ${utmCampaign ?? null}, ${utmContent ?? null},
        ${fbp ?? null}, ${fbc ?? null}, ${gaClientId ?? null}, ${ipAddress}
      )
    `;

    // Send emails (non-blocking — don't fail order if email fails)
    try {
      const { subject: buyerSubject, html: buyerHtml } = buyerConfirmationEmail({
        firstName: firstName.trim(),
        orderId,
        productName: product.name,
        amountUsd: amountChargedUsd,
        paymentMethod,
        invoiceUrl: invoiceUrl ?? undefined,
      });
      await sendToCustomer(email, buyerSubject, buyerHtml);

      const { subject: adminSubject, html: adminHtml } = adminNotificationEmail({
        orderId,
        firstName: firstName.trim(),
        email,
        country: country.trim(),
        productName: product.name,
        amountUsd,
        amountChargedUsd,
        paymentMethod,
        utmSource,
        utmCampaign,
        utmContent,
      });
      await sendToAdmin(adminSubject, adminHtml);
    } catch (emailErr) {
      console.error('[checkout] email send error:', emailErr);
    }

    // Fire CAPI Purchase server-side (order_submitted = primary conversion signal)
    try {
      await fetch('https://isrib-analytics-api-fbqy.vercel.app/api/confirm-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          value: amountChargedUsd,
          currency: 'USD',
          email,
          fbp: fbp ?? '',
          fbc: fbc ?? '',
          source: 'order_submitted_landing',
        }),
      });
    } catch (capiErr) {
      console.error('[checkout] CAPI error:', capiErr);
    }

    // Enqueue abandoned checkout emails via QStash
    try {
      const qstash = new Client({ token: process.env.QSTASH_TOKEN! });
      const abandonedUrl = `${siteUrl}/api/abandoned-checkout`;

      const payload = JSON.stringify({
        orderId,
        firstName: firstName.trim(),
        email,
        productId: product.id,
        productName: product.name,
        amountChargedUsd,
        paymentMethod,
        invoiceUrl: invoiceUrl ?? null,
      });

      // Email 1: 2 hours
      await qstash.publishJSON({
        url: abandonedUrl,
        body: { ...JSON.parse(payload), emailNumber: 1 },
        delay: 2 * 60 * 60,
      });

      // Email 2: 24 hours
      await qstash.publishJSON({
        url: abandonedUrl,
        body: { ...JSON.parse(payload), emailNumber: 2 },
        delay: 24 * 60 * 60,
      });
    } catch (qErr) {
      console.error('[checkout] QStash enqueue error:', qErr);
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentMethod,
      invoiceUrl: invoiceUrl ?? null,
      amountChargedUsd,
    });
  } catch (err) {
    console.error('[checkout] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
