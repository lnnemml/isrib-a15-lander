import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let _sql: NeonQueryFunction<false, false> | undefined;

function initSql(): NeonQueryFunction<false, false> {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!);
  return _sql;
}

// Proxy defers neon() call to request time so the module can be imported during build
export const sql = new Proxy(
  (() => undefined) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, thisArg, args) {
      return Reflect.apply(
        initSql() as unknown as (...a: unknown[]) => unknown,
        thisArg,
        args,
      );
    },
  },
);

let tableEnsured = false;

export async function ensureOrdersTable(): Promise<void> {
  if (tableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS orders_landing (
      id                          SERIAL PRIMARY KEY,
      order_id                    TEXT UNIQUE NOT NULL,
      first_name                  TEXT,
      email                       TEXT NOT NULL,
      country                     TEXT,
      product_id                  TEXT NOT NULL,
      product_name                TEXT NOT NULL,
      amount_usd                  DECIMAL(10,2) NOT NULL,
      amount_charged_usd          DECIMAL(10,2) NOT NULL,
      payment_method              TEXT NOT NULL,
      payment_status              TEXT NOT NULL DEFAULT 'pending',
      nowpayments_invoice_id      TEXT,
      nowpayments_invoice_url     TEXT,
      utm_source                  TEXT,
      utm_medium                  TEXT,
      utm_campaign                TEXT,
      utm_content                 TEXT,
      fbp                         TEXT,
      fbc                         TEXT,
      ga_client_id                TEXT,
      ip_address                  TEXT,
      created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      confirmed_at                TIMESTAMPTZ,
      abandoned_email1_sent_at    TIMESTAMPTZ,
      abandoned_email2_sent_at    TIMESTAMPTZ,
      confirmation_email_sent_at  TIMESTAMPTZ
    )
  `;
  tableEnsured = true;
}
