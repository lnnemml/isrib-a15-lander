import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendToCustomer, sendToAdmin } from '@/lib/resend';
import { paymentConfirmedEmail } from '@/lib/emails/payment-confirmed';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId } = await req.json() as { orderId: string };
  if (!orderId) {
    return NextResponse.json({ error: 'orderId required' }, { status: 400 });
  }

  const rows = await sql`
    SELECT order_id, first_name, email, product_name, amount_charged_usd,
           payment_status, confirmation_email_sent_at
    FROM orders_landing
    WHERE order_id = ${orderId}
  `;

  if (rows.length === 0) {
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

  if (order.payment_status === 'confirmed') {
    return NextResponse.json({ skipped: 'already confirmed', orderId });
  }

  // Update status
  await sql`
    UPDATE orders_landing
    SET payment_status = 'confirmed', confirmed_at = NOW()
    WHERE order_id = ${orderId}
  `;

  // Send confirmation email to buyer
  const { subject, html } = paymentConfirmedEmail({
    firstName: order.first_name,
    orderId: order.order_id,
    productName: order.product_name,
  });
  await sendToCustomer(order.email, subject, html);

  await sql`
    UPDATE orders_landing
    SET confirmation_email_sent_at = NOW()
    WHERE order_id = ${orderId}
  `;

  // Admin notification
  await sendToAdmin(
    `✅ Manually confirmed: ${orderId}`,
    `<p style="font-family:monospace;color:#4ade80;">Order <strong>${orderId}</strong> manually confirmed.<br>Customer: ${order.email}<br>Product: ${order.product_name}<br>Amount: $${order.amount_charged_usd}</p>`
  );

  return NextResponse.json({ confirmed: true, orderId });
}
