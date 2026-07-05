import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureOrdersTable } from '@/lib/db';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureOrdersTable();

  const status = req.nextUrl.searchParams.get('status') ?? 'all';

  const rows = status === 'all'
    ? await sql`
        SELECT order_id, first_name, email, country, product_name,
               amount_charged_usd, payment_method, payment_status,
               utm_source, utm_content, created_at, confirmed_at
        FROM orders_landing
        ORDER BY created_at DESC
        LIMIT 100
      `
    : await sql`
        SELECT order_id, first_name, email, country, product_name,
               amount_charged_usd, payment_method, payment_status,
               utm_source, utm_content, created_at, confirmed_at
        FROM orders_landing
        WHERE payment_status = ${status}
        ORDER BY created_at DESC
        LIMIT 100
      `;

  return NextResponse.json({ orders: rows, count: rows.length });
}
