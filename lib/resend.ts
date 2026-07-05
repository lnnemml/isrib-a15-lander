import { Resend } from 'resend';

let _resend: Resend | undefined;

function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

function getFrom(): string {
  return process.env.FROM_EMAIL ?? 'orders@isrib-a15.com';
}

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAIL ?? '').split(',').map((e) => e.trim()).filter(Boolean);
}

export async function sendToCustomer(email: string, subject: string, html: string): Promise<void> {
  await getResend().emails.send({
    from: `The Synthesis Lab <${getFrom()}>`,
    to: email,
    replyTo: 'isrib.shop@protonmail.com',
    subject,
    html,
  });
}

export async function sendToAdmin(subject: string, html: string): Promise<void> {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) return;
  await getResend().emails.send({
    from: `ISRIB Orders <${getFrom()}>`,
    to: adminEmails,
    subject,
    html,
  });
}
