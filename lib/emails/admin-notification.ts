export function adminNotificationEmail({
  orderId,
  firstName,
  email,
  country,
  productName,
  amountUsd,
  amountChargedUsd,
  paymentMethod,
  utmSource,
  utmCampaign,
  utmContent,
}: {
  orderId: string;
  firstName: string;
  email: string;
  country: string;
  productName: string;
  amountUsd: number;
  amountChargedUsd: number;
  paymentMethod: 'crypto' | 'manual';
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
}): { subject: string; html: string } {
  const subject = `New order: ${firstName} — $${amountChargedUsd} — ${paymentMethod}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:monospace;background:#0a0a0a;color:#e0e0e0;padding:32px;">
  <h2 style="color:#E8A427;">🧪 New Order — ${orderId}</h2>
  <table style="border-collapse:collapse;width:100%;max-width:500px;">
    <tr><td style="padding:6px 0;color:#888;">Name</td><td style="padding:6px 16px;">${firstName}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 16px;"><a href="mailto:${email}" style="color:#E8A427;">${email}</a></td></tr>
    <tr><td style="padding:6px 0;color:#888;">Country</td><td style="padding:6px 16px;">${country}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Product</td><td style="padding:6px 16px;">${productName}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">List price</td><td style="padding:6px 16px;">$${amountUsd}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Charged</td><td style="padding:6px 16px;color:#4ade80;font-weight:bold;">$${amountChargedUsd}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Payment</td><td style="padding:6px 16px;">${paymentMethod}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">UTM source</td><td style="padding:6px 16px;">${utmSource ?? '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Campaign</td><td style="padding:6px 16px;">${utmCampaign ?? '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#888;">Creative</td><td style="padding:6px 16px;">${utmContent ?? '—'}</td></tr>
  </table>
  <p style="margin-top:24px;color:#555;font-size:12px;">isrib-a15.com · orders_landing table</p>
</body>
</html>`;

  return { subject, html };
}
