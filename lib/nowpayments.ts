const BASE_URL = 'https://api.nowpayments.io/v1';

export interface NowPaymentsInvoice {
  id: string;
  invoice_url: string;
  order_id: string;
  price_amount: number;
  price_currency: string;
}

export async function createInvoice({
  orderId,
  amountUsd,
  productName,
  successUrl,
  cancelUrl,
}: {
  orderId: string;
  amountUsd: number;
  productName: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<NowPaymentsInvoice> {
  const res = await fetch(`${BASE_URL}/invoice`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NOWPAYMENTS_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: amountUsd,
      price_currency: 'usd',
      order_id: orderId,
      order_description: productName,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/nowpayments-webhook`,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NowPayments invoice creation failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<NowPaymentsInvoice>;
}

import crypto from 'crypto';

export function verifyNowPaymentsSignature(
  body: Record<string, unknown>,
  signature: string,
): boolean {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET!;
  const sortedBody = JSON.stringify(sortObjectByKeys(body));
  const hmac = crypto.createHmac('sha512', secret).update(sortedBody).digest('hex');
  return hmac === signature;
}

function sortObjectByKeys(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}
