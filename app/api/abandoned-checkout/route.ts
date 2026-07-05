import { NextRequest, NextResponse } from 'next/server';
import { Receiver } from '@upstash/qstash';
import { sql } from '@/lib/db';
import { sendToCustomer } from '@/lib/resend';
import { abandonedCheckoutEmail } from '@/lib/emails/abandoned-checkout';
import { getCryptoRates } from '@/lib/crypto-rates';

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('upstash-signature') ?? '';

    const isValid = await receiver.verify({
      signature,
      body,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/abandoned-checkout`,
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const {
      orderId,
      firstName,
      email,
      productName,
      amountChargedUsd,
      paymentMethod,
      invoiceUrl,
      emailNumber,
    } = JSON.parse(body) as {
      orderId: string;
      firstName: string;
      email: string;
      productName: string;
      amountChargedUsd: number;
      paymentMethod: 'crypto' | 'manual';
      invoiceUrl?: string | null;
      emailNumber: 1 | 2;
    };

    // Check order status — skip if already confirmed
    const rows = await sql`
      SELECT payment_status, abandoned_email1_sent_at, abandoned_email2_sent_at
      FROM orders_landing
      WHERE order_id = ${orderId}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ skipped: 'order not found' });
    }

    const order = rows[0] as {
      payment_status: string;
      abandoned_email1_sent_at: string | null;
      abandoned_email2_sent_at: string | null;
    };

    if (order.payment_status === 'confirmed') {
      return NextResponse.json({ skipped: 'already confirmed' });
    }

    // Skip if already sent this email number
    if (emailNumber === 1 && order.abandoned_email1_sent_at) {
      return NextResponse.json({ skipped: 'email1 already sent' });
    }
    if (emailNumber === 2 && order.abandoned_email2_sent_at) {
      return NextResponse.json({ skipped: 'email2 already sent' });
    }

    const rates = await getCryptoRates(amountChargedUsd);

    const { subject, html } = abandonedCheckoutEmail({
      firstName,
      orderId,
      productName,
      amountChargedUsd,
      paymentMethod,
      invoiceUrl: invoiceUrl ?? undefined,
      emailNumber,
      btcEquivalent: rates.btcEquivalent,
      ltcEquivalent: rates.ltcEquivalent,
    });

    await sendToCustomer(email, subject, html);

    if (emailNumber === 1) {
      await sql`UPDATE orders_landing SET abandoned_email1_sent_at = NOW() WHERE order_id = ${orderId}`;
    } else {
      await sql`UPDATE orders_landing SET abandoned_email2_sent_at = NOW() WHERE order_id = ${orderId}`;
    }

    return NextResponse.json({ sent: true, emailNumber });
  } catch (err) {
    console.error('[abandoned-checkout] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
