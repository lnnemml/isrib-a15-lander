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
  const subject = `${firstName}, your ISRIB A15 order is received`;

  const paymentSection =
    paymentMethod === 'crypto'
      ? `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.6;">
          You selected cryptocurrency payment. If you haven't completed payment yet,
          use the link below to access your payment page.
        </p>
        ${
          invoiceUrl
            ? `<a href="${invoiceUrl}" style="display:inline-block;background:#E8A427;color:#0D0D12;padding:12px 28px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px;margin:16px 0;">Complete Payment →</a>`
            : ''
        }
      `
      : `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.6;">
          You selected manual payment. We will reply to this email within a few hours
          with payment details (PayPal, SEPA, SWIFT, crypto, or Western Union).
          Please reply to this email if you have any questions.
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
          <p style="color:#E8A427;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 24px;">Order Confirmed</p>
          <h1 style="color:#f5f5f0;font-size:22px;font-weight:700;margin:0 0 8px;">${firstName}, your order is received.</h1>
          <p style="color:#888;font-size:14px;margin:0 0 32px;">Order ID: <span style="color:#E8A427;font-family:monospace;">${orderId}</span></p>

          <table width="100%" style="background:#1a1a20;border-radius:8px;padding:20px;margin-bottom:28px;border:1px solid #2a2a30;">
            <tr>
              <td style="color:#888;font-size:13px;">Product</td>
              <td align="right" style="color:#f5f5f0;font-size:13px;font-weight:600;">${productName}</td>
            </tr>
            <tr><td style="padding-top:10px;color:#888;font-size:13px;">Amount</td>
              <td align="right" style="padding-top:10px;color:#f5f5f0;font-size:13px;font-weight:600;">$${amountUsd.toFixed(2)} USD</td>
            </tr>
            <tr><td style="padding-top:10px;color:#888;font-size:13px;">Payment</td>
              <td align="right" style="padding-top:10px;color:#f5f5f0;font-size:13px;font-weight:600;">${paymentMethod === 'crypto' ? 'Cryptocurrency' : 'Manual transfer'}</td>
            </tr>
          </table>

          ${paymentSection}

          <p style="color:#555;font-size:13px;margin-top:32px;line-height:1.6;">
            Once payment is confirmed, we will ship your order and send tracking information to this email.
            Typical shipping time: 5–12 business days depending on your location.
          </p>
          <p style="color:#555;font-size:13px;margin-top:12px;">
            Questions? Reply to this email — we respond within 24 hours.
          </p>
        </td></tr>
      </table>
      <p style="color:#333;font-size:12px;margin-top:24px;">ISRIB A15 · isrib-a15.com</p>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
