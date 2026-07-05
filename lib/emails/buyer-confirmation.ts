export function buyerConfirmationEmail({
  firstName,
  orderId,
  productName,
  amountUsd,
  paymentMethod,
  invoiceUrl,
  btcEquivalent,
  ltcEquivalent,
}: {
  firstName: string;
  orderId: string;
  productName: string;
  amountUsd: number;
  paymentMethod: 'crypto' | 'manual';
  invoiceUrl?: string;
  btcEquivalent?: string;
  ltcEquivalent?: string;
}): { subject: string; html: string } {
  const subject =
    paymentMethod === 'manual'
      ? `Your ISRIB A15 order — transfer details inside`
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
          Send payment using one of the methods below.
          Once received, we will confirm and start preparing your order.
        </p>

        <!-- PayPal -->
        <div style="background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;padding:18px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
            <span style="color:#f5f5f0;font-size:14px;font-weight:700;">PayPal</span>
            <span style="color:#4ade80;font-size:11px;font-weight:600;margin-left:8px;">RECOMMENDED</span>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;width:110px;">Send to</td>
              <td style="padding:7px 0;color:#E8A427;font-weight:600;">isrib.shop@protonmail.com</td>
            </tr>
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;">Recipient name</td>
              <td style="padding:7px 0;color:#f5f5f0;">Danylo Tsymbaliuk</td>
            </tr>
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;">Amount</td>
              <td style="padding:7px 0;color:#f5f5f0;font-weight:700;">$${amountUsd.toFixed(2)} USD</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#888;">Note / Reference</td>
              <td style="padding:7px 0;color:#E8A427;font-family:monospace;font-size:12px;">${orderId}</td>
            </tr>
          </table>
          <p style="color:#555;font-size:12px;margin:10px 0 0;line-height:1.5;">
            Important: select <strong style="color:#888;">"For friends and family"</strong> to avoid fees.
            Include your Order ID in the note field.
          </p>
        </div>

        <!-- USDT -->
        <div style="background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;padding:18px;margin-bottom:12px;">
          <p style="color:#f5f5f0;font-size:14px;font-weight:700;margin:0 0 12px;">USDT (TRC-20)</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;width:110px;">Address</td>
              <td style="padding:7px 0;">
                <code style="color:#E8A427;font-size:11px;word-break:break-all;">TDRnCaDUQQDRsZEQbBtMPKxa7MgHzuW5re</code>
              </td>
            </tr>
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;">Network</td>
              <td style="padding:7px 0;color:#f5f5f0;">TRON (TRC-20) only</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#888;">Amount</td>
              <td style="padding:7px 0;color:#f5f5f0;font-weight:700;">${amountUsd.toFixed(2)} USDT</td>
            </tr>
          </table>
          <p style="color:#f87171;font-size:12px;margin:10px 0 0;">
            ⚠ Send only on TRC-20 network. Sending on wrong network = lost funds.
          </p>
        </div>

        <!-- BTC -->
        <div style="background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;padding:18px;margin-bottom:12px;">
          <p style="color:#f5f5f0;font-size:14px;font-weight:700;margin:0 0 12px;">Bitcoin (BTC)</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;width:110px;">Address</td>
              <td style="padding:7px 0;">
                <code style="color:#E8A427;font-size:11px;word-break:break-all;">bc1q4ujd2mfp6t6lcu3p2vlj4dxzs6rxhzzlcrh07m</code>
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#888;">Amount</td>
              <td style="padding:7px 0;color:#f5f5f0;font-weight:700;">
                ${btcEquivalent ? `≈ ${btcEquivalent} BTC` : `≈ $${amountUsd} USD equivalent`}
                <span style="color:#555;font-size:11px;display:block;margin-top:2px;">
                  ${btcEquivalent ? `(rate at time of order — verify before sending)` : `(check current BTC rate before sending)`}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <!-- LTC -->
        <div style="background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;padding:18px;margin-bottom:20px;">
          <p style="color:#f5f5f0;font-size:14px;font-weight:700;margin:0 0 12px;">Litecoin (LTC)</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr style="border-bottom:1px solid #2a2a30;">
              <td style="padding:7px 0;color:#888;width:110px;">Address</td>
              <td style="padding:7px 0;">
                <code style="color:#E8A427;font-size:11px;word-break:break-all;">ltc1q27awh06ddvgma7pafsdk3sg5kny8f099zmewk7</code>
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#888;">Amount</td>
              <td style="padding:7px 0;color:#f5f5f0;font-weight:700;">
                ${ltcEquivalent ? `≈ ${ltcEquivalent} LTC` : `≈ $${amountUsd} USD equivalent`}
                <span style="color:#555;font-size:11px;display:block;margin-top:2px;">
                  ${ltcEquivalent ? `(rate at time of order — verify before sending)` : `(check current LTC rate before sending)`}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Other methods -->
        <div style="background:#111;border:1px solid #2a2a30;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
          <p style="color:#888;font-size:13px;line-height:1.6;margin:0;">
            Prefer SEPA, SWIFT, or Western Union?
            <a href="mailto:isrib.shop@protonmail.com?subject=Payment method for ${encodeURIComponent(orderId)}"
               style="color:#E8A427;text-decoration:none;font-weight:600;">
              Reply to this email
            </a>
            and we will arrange the details.
          </p>
        </div>

        <div style="border-top:1px solid #2a2a30;padding-top:16px;">
          <p style="color:#555;font-size:13px;line-height:1.6;margin:0;">
            After sending, reply with a screenshot or transaction ID to speed up confirmation.
            We ship within 1–3 business days of confirmed payment.
            Typical delivery: 5–12 business days.
          </p>
        </div>
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
            ${paymentMethod === 'manual' ? 'Order Received — Awaiting Payment' : 'Order Received'}
          </p>

          <h1 style="color:#f5f5f0;font-size:22px;font-weight:700;margin:0 0 6px;">
            ${paymentMethod === 'manual'
              ? `${firstName}, your order is in.`
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
