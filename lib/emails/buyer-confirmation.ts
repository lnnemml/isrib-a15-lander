export function buyerConfirmationEmail({
  firstName,
  orderId,
  productName,
  amountUsd,
  paymentMethod,
  invoiceUrl,
}: {
  firstName: string;
  orderId: string;
  productName: string;
  amountUsd: number;
  paymentMethod: 'crypto' | 'manual';
  invoiceUrl?: string;
}): { subject: string; html: string } {
  const subject =
    paymentMethod === 'manual'
      ? `${firstName}, how would you like to pay? — Order ${orderId}`
      : `${firstName}, complete your ISRIB A15 payment`;

  const paymentSection =
    paymentMethod === 'crypto'
      ? `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.6;margin-bottom:16px;">
          Complete your payment using the link below. We accept BTC, ETH, USDT and 50+ cryptocurrencies.
        </p>
        ${
          invoiceUrl
            ? `<a href="${invoiceUrl}" style="display:inline-block;background:#E8A427;color:#0D0D12;padding:13px 32px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px;margin:4px 0 20px;">Complete Payment →</a>`
            : ''
        }
        <p style="color:#555;font-size:13px;line-height:1.6;">
          Once payment is received, we will ship your order and send tracking information to this address.
          Typical shipping: 5–12 business days.
        </p>
      `
      : `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.7;margin-bottom:20px;">
          <strong style="color:#f5f5f0;">Reply to this email</strong> and let us know how you'd like to pay.
          We'll take it from there within a few hours.
        </p>

        <div style="background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;padding:20px;margin-bottom:24px;">
          <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;">
            Available payment methods
          </p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;">
                <span style="color:#f5f5f0;font-size:14px;font-weight:600;">PayPal</span>
              </td>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;color:#888;font-size:13px;text-align:right;">
                We send you a PayPal request
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;">
                <span style="color:#f5f5f0;font-size:14px;font-weight:600;">SEPA / SWIFT</span>
              </td>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;color:#888;font-size:13px;text-align:right;">
                We send bank details
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;">
                <span style="color:#f5f5f0;font-size:14px;font-weight:600;">Wise</span>
              </td>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;color:#888;font-size:13px;text-align:right;">
                We send transfer details
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;">
                <span style="color:#f5f5f0;font-size:14px;font-weight:600;">Crypto (self-custody)</span>
              </td>
              <td style="padding:7px 0;border-bottom:1px solid #2a2a30;color:#888;font-size:13px;text-align:right;">
                BTC, ETH, USDT wallet address
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;">
                <span style="color:#f5f5f0;font-size:14px;font-weight:600;">Western Union</span>
              </td>
              <td style="padding:7px 0;color:#888;font-size:13px;text-align:right;">
                We arrange the details
              </td>
            </tr>
          </table>
        </div>

        <a href="mailto:isrib.shop@protonmail.com?subject=Payment for ${encodeURIComponent(orderId)}&body=Hi, I would like to pay via [METHOD] for order ${encodeURIComponent(orderId)}."
           style="display:inline-block;background:#E8A427;color:#0D0D12;padding:13px 32px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:20px;">
          Reply with payment method →
        </a>

        <p style="color:#555;font-size:13px;line-height:1.6;">
          Once payment is received, we will ship your order and send tracking information to this email.
          Typical shipping: 5–12 business days depending on your location.
        </p>
      `;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0D0D12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D12;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141418;border-radius:12px;padding:40px;border:1px solid #2a2a30;">
        <tr><td>
          <p style="color:#E8A427;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 20px;">
            ${paymentMethod === 'manual' ? 'Order Received — Payment Pending' : 'Order Received'}
          </p>

          <h1 style="color:#f5f5f0;font-size:22px;font-weight:700;margin:0 0 6px;">
            ${paymentMethod === 'manual'
              ? `${firstName}, one step left.`
              : `${firstName}, your order is placed.`}
          </h1>

          <p style="color:#888;font-size:14px;margin:0 0 28px;">
            Order ID: <span style="color:#E8A427;font-family:monospace;">${orderId}</span>
          </p>

          <table width="100%" style="background:#1a1a20;border-radius:8px;padding:18px;margin-bottom:28px;border:1px solid #2a2a30;">
            <tr>
              <td style="color:#888;font-size:13px;padding:4px 0;">Product</td>
              <td align="right" style="color:#f5f5f0;font-size:13px;font-weight:600;padding:4px 0;">${productName}</td>
            </tr>
            <tr>
              <td style="color:#888;font-size:13px;padding:4px 0;">Amount</td>
              <td align="right" style="color:#f5f5f0;font-size:13px;font-weight:600;padding:4px 0;">$${amountUsd.toFixed(2)} USD</td>
            </tr>
          </table>

          ${paymentSection}

        </td></tr>
      </table>
      <p style="color:#333;font-size:12px;margin-top:20px;">ISRIB A15 · isrib-a15.com</p>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
