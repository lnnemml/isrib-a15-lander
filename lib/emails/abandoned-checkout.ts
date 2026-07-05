export function abandonedCheckoutEmail({
  firstName,
  orderId,
  productName,
  amountChargedUsd,
  paymentMethod,
  invoiceUrl,
  emailNumber,
}: {
  firstName: string;
  orderId: string;
  productName: string;
  amountChargedUsd: number;
  paymentMethod: 'crypto' | 'manual';
  invoiceUrl?: string;
  emailNumber: 1 | 2;
}): { subject: string; html: string } {
  const subject =
    emailNumber === 1
      ? `${firstName}, your order is still waiting`
      : `Last reminder — ISRIB A15 order ${orderId}`;

  const bodyText =
    emailNumber === 1
      ? `You placed an order a few hours ago but payment hasn't been received yet.`
      : `This is a final reminder about your pending ISRIB A15 order.`;

  const paymentNote =
    paymentMethod === 'crypto' && invoiceUrl
      ? `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.6;margin-bottom:16px;">
          Your crypto payment invoice is still active. You can complete it using the link below.
        </p>
        <a href="${invoiceUrl}" style="display:inline-block;background:#E8A427;color:#0D0D12;padding:12px 28px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px;">
          Complete Crypto Payment →
        </a>
        <div style="margin-top:28px;padding:20px;background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;">
          <p style="color:#888;font-size:13px;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.06em;">
            Prefer to pay differently?
          </p>
          <p style="color:#b0b0b0;font-size:14px;line-height:1.7;margin:0;">
            Simply reply to this email — we accept <strong style="color:#f5f5f0;">PayPal, SEPA, SWIFT, Wise,</strong> and
            <strong style="color:#f5f5f0;">Western Union</strong> as well. Just mention your Order ID
            <span style="color:#E8A427;font-family:monospace;">${orderId}</span> and we'll sort it within a few hours.
          </p>
        </div>
      `
      : paymentMethod === 'crypto'
      ? `
        <div style="padding:20px;background:#1a1a20;border-radius:8px;border:1px solid #2a2a30;">
          <p style="color:#b0b0b0;font-size:14px;line-height:1.7;margin:0;">
            Had trouble with the payment? No problem — reply to this email and we'll send you
            manual payment options: <strong style="color:#f5f5f0;">PayPal, SEPA, SWIFT, Wise, or Western Union.</strong>
            Just include your Order ID <span style="color:#E8A427;font-family:monospace;">${orderId}</span>.
          </p>
        </div>
      `
      : `
        <p style="color:#b0b0b0;font-size:15px;line-height:1.6;">
          Simply reply to this email with your preferred payment method and we'll get back to you
          within a few hours. Include your Order ID in the subject line.
        </p>
      `;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D0D12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D12;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141418;border-radius:12px;padding:40px;border:1px solid #2a2a30;">
        <tr><td>
          <h1 style="color:#f5f5f0;font-size:20px;font-weight:700;margin:0 0 12px;">${firstName}, ${bodyText}</h1>
          <p style="color:#888;font-size:14px;margin:0 0 28px;">Order ID: <span style="color:#E8A427;font-family:monospace;">${orderId}</span> · ${productName} · $${amountChargedUsd}</p>
          ${paymentNote}
          <p style="color:#555;font-size:13px;margin-top:28px;line-height:1.6;">
            If you had trouble with payment or changed your mind, just reply — we're happy to help or answer any questions.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
