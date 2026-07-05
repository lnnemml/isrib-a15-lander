import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment Confirmed — ISRIB A15',
  robots: 'noindex',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#14532d',
            border: '1px solid #166534',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}>
            ✓
          </div>
        </div>

        {/* Card */}
        <div className="card text-center">
          <p style={{
            color: '#4ade80',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Payment Received
          </p>

          <h1 style={{
            color: '#f5f5f0',
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 12px',
            lineHeight: 1.3,
          }}>
            You&apos;re all set.
          </h1>

          <p style={{
            color: '#b0b0b0',
            fontSize: 15,
            lineHeight: 1.7,
            margin: '0 0 28px',
          }}>
            Your payment has been confirmed. Check your email — we&apos;ve sent you
            a confirmation with next steps.
          </p>

          <div style={{
            background: '#1a1a20',
            border: '1px solid #2a2a30',
            borderRadius: 8,
            padding: '16px 20px',
            marginBottom: 28,
            textAlign: 'left',
          }}>
            <p style={{
              color: '#888',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            }}>
              What happens next
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Reply to the confirmation email with your shipping address',
                'We dispatch within 1–3 business days',
                'Tracking info sent once shipped (5–12 days delivery)',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    color: '#E8A427',
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: 1.5,
                    flexShrink: 0,
                  }}>
                    {i + 1}.
                  </span>
                  <p style={{ color: '#b0b0b0', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: '#555', fontSize: 13, margin: '0 0 24px' }}>
            Questions? Reply to the confirmation email or contact{' '}
            <a
              href="mailto:isrib.shop@protonmail.com"
              style={{ color: '#E8A427', textDecoration: 'none' }}
            >
              isrib.shop@protonmail.com
            </a>
          </p>

          <Link
            href="/"
            style={{
              color: '#555',
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            ← Back to ISRIB A15
          </Link>
        </div>
      </div>
    </main>
  );
}
