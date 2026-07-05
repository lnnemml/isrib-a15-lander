export function paymentConfirmedEmail({
  firstName,
  orderId,
  productName,
}: {
  firstName: string;
  orderId: string;
  productName: string;
}): { subject: string; html: string } {
  const subject = `${firstName}, payment confirmed — we need your shipping details`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0D0D12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D12;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#141418;border-radius:12px;padding:40px;border:1px solid #2a2a30;">
        <tr><td>
          <p style="color:#4ade80;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 20px;">
            ✓ Payment Received
          </p>

          <h1 style="color:#f5f5f0;font-size:22px;font-weight:700;margin:0 0 6px;">
            ${firstName}, your payment is confirmed.
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
              <td style="color:#888;font-size:13px;padding:4px 0;">Status</td>
              <td align="right" style="color:#4ade80;font-size:13px;font-weight:600;padding:4px 0;">Paid</td>
            </tr>
          </table>

          <div style="background:#1a1a20;border:1px solid #E8A427;border-radius:8px;padding:20px;margin-bottom:24px;">
            <p style="color:#E8A427;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">
              Action required — shipping details
            </p>
            <p style="color:#b0b0b0;font-size:14px;line-height:1.7;margin:0 0 14px;">
              To ship your order, please reply to this email with the following information:
            </p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#f5f5f0;font-size:14px;font-weight:600;">
                  Full name
                </td>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#555;font-size:13px;text-align:right;">
                  as on the package
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#f5f5f0;font-size:14px;font-weight:600;">
                  Full address
                </td>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#555;font-size:13px;text-align:right;">
                  street, city, region
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#f5f5f0;font-size:14px;font-weight:600;">
                  Postal code
                </td>
                <td style="padding:6px 0;border-bottom:1px solid #2a2a30;color:#555;font-size:13px;text-align:right;">
                  zip / postcode
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#f5f5f0;font-size:14px;font-weight:600;">
                  Mobile number
                </td>
                <td style="padding:6px 0;color:#555;font-size:13px;text-align:right;">
                  for courier contact
                </td>
              </tr>
            </table>
          </div>

          <a href="mailto:isrib.shop@protonmail.com?subject=Shipping details for ${encodeURIComponent(orderId)}&body=Hi,%0A%0AHere are my shipping details for order ${encodeURIComponent(orderId)}:%0A%0AFull name: %0AAddress: %0APostal code: %0AMobile: "
             style="display:inline-block;background:#E8A427;color:#0D0D12;padding:13px 32px;border-radius:6px;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:24px;">
            Send shipping details →
          </a>

          <p style="color:#555;font-size:13px;line-height:1.6;">
            We will dispatch your order within 1–3 business days of receiving your shipping details.
            Typical delivery: 5–12 business days depending on your location.
          </p>
        </td></tr>
      </table>
      <p style="color:#333;font-size:12px;margin-top:20px;">ISRIB A15 · isrib-a15.com</p>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
