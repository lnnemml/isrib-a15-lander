export function paymentConfirmedEmail({
  firstName,
  orderId,
  productName,
}: {
  firstName: string;
  orderId: string;
  productName: string;
}): { subject: string; html: string } {
  const subject = `${firstName}, payment confirmed — we're preparing your order`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0D0D12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D12;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141418;border-radius:12px;padding:40px;border:1px solid #2a2a30;">
        <tr><td>
          <p style="color:#4ade80;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 16px;">✓ Payment Received</p>
          <h1 style="color:#f5f5f0;font-size:22px;font-weight:700;margin:0 0 8px;">Your order is confirmed, ${firstName}.</h1>
          <p style="color:#888;font-size:14px;margin:0 0 28px;">Order ID: <span style="color:#E8A427;font-family:monospace;">${orderId}</span></p>
          <p style="color:#b0b0b0;font-size:15px;line-height:1.6;">
            We've received your payment for <strong style="color:#f5f5f0;">${productName}</strong>.
            Your order is now being prepared and will ship within 1–3 business days.
            We'll send tracking information once dispatched.
          </p>
          <p style="color:#555;font-size:13px;margin-top:28px;">Questions? Reply to this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
