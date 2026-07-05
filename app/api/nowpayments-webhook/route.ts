import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyNowPaymentsSignature } from '@/lib/nowpayments';
import { sendToCustomer, sendToAdmin } from '@/lib/resend';
import { paymentConfirmedEmail } from '@/lib/emails/payment-confirmed';
import { getCryptoRates } from '@/lib/crypto-rates';
import { cryptoPaymentFailedEmail } from '@/lib/emails/crypto-payment-failed';

const CONFIRMED_STATUSES = new Set(['finished', 'confirmed']);
const FAILED_STATUSES = new Set(['failed', 'expired']);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-nowpayments-sig') ?? '';

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!verifyNowPaymentsSignature(payload, signature)) {
      console.error('[nowpayments-webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const paymentStatus = payload.payment_status as string;
    const orderId = payload.order_id as string;

    console.log(`[nowpayments-webhook] order=${orderId} status=${paymentStatus}`);

    if (!CONFIRMED_STATUSES.has(paymentStatus)) {
      if (FAILED_STATUSES.has(paymentStatus)) {
        // Payment failed or expired — send manual payment options email
        try {
          const failedRows = await sql`
            SELECT order_id, first_name, email, product_name, amount_charged_usd
            FROM orders_landing
            WHERE order_id = ${orderId}
          `;
          if (failedRows.length > 0) {
            const o = failedRows[0] as {
              order_id: string;
              first_name: string;
              email: string;
              product_name: string;
              amount_charged_usd: number;
            };
            const rates = await getCryptoRates(Number(o.amount_charged_usd));
            const { subject, html } = cryptoPaymentFailedEmail({
              firstName: o.first_name,
              orderId: o.order_id,
              productName: o.product_name,
              amountUsd: Number(o.amount_charged_usd),
              status: paymentStatus,
              btcEquivalent: rates.btcEquivalent,
              ltcEquivalent: rates.ltcEquivalent,
            });
            await sendToCustomer(o.email, subject, html);
            console.log(`[nowpayments-webhook] Sent failed payment email for ${orderId}`);
          }
        } catch (failErr) {
          console.error('[nowpayments-webhook] failed payment email error:', failErr);
        }
      }
      return NextResponse.json({ received: true, action: 'none' });
    }

    // Fetch order details
    const rows = await sql`
      SELECT order_id, first_name, email, product_name, amount_charged_usd, payment_status, confirmation_email_sent_at
      FROM orders_landing
      WHERE order_id = ${orderId}
    `;

    if (rows.length === 0) {
      console.error(`[nowpayments-webhook] Order not found: ${orderId}`);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = rows[0] as {
      order_id: string;
      first_name: string;
      email: string;
      product_name: string;
      amount_charged_usd: number;
      payment_status: string;
      confirmation_email_sent_at: string | null;
    };

    // Idempotent — skip if already confirmed
    if (order.payment_status === 'confirmed' && order.confirmation_email_sent_at) {
      return NextResponse.json({ received: true, action: 'already_confirmed' });
    }

    // Update order status
    await sql`
      UPDATE orders_landing
      SET payment_status = 'confirmed', confirmed_at = NOW()
      WHERE order_id = ${orderId}
    `;

    // Send confirmation email to buyer
    try {
      const { subject, html } = paymentConfirmedEmail({
        firstName: order.first_name,
        orderId: order.order_id,
        productName: order.product_name,
      });
      await sendToCustomer(order.email, subject, html);
      await sql`UPDATE orders_landing SET confirmation_email_sent_at = NOW() WHERE order_id = ${orderId}`;
    } catch (emailErr) {
      console.error('[nowpayments-webhook] confirmation email error:', emailErr);
    }

    // Admin notification
    try {
      await sendToAdmin(
        `✅ Payment confirmed: ${order.order_id} — $${order.amount_charged_usd}`,
        `<p style="font-family:monospace;color:#4ade80;">Payment confirmed for order <strong>${order.order_id}</strong>.<br>Customer: ${order.email}<br>Product: ${order.product_name}<br>Amount: $${order.amount_charged_usd}</p>`
      );
    } catch (adminErr) {
      console.error('[nowpayments-webhook] admin email error:', adminErr);
    }

    // Fire CAPI Purchase event (server-side)
    try {
      const capiRes = await fetch(
        'https://isrib-analytics-api-fbqy.vercel.app/api/confirm-purchase',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.order_id,
            value: Number(order.amount_charged_usd),
            currency: 'USD',
            email: order.email,
            source: 'nowpayments_webhook',
          }),
        }
      );
      const capiData = await capiRes.json();
      console.log('[nowpayments-webhook] CAPI:', JSON.stringify(capiData));
    } catch (capiErr) {
      console.error('[nowpayments-webhook] CAPI error:', capiErr);
    }

    return NextResponse.json({ received: true, action: 'confirmed' });
  } catch (err) {
    console.error('[nowpayments-webhook] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
