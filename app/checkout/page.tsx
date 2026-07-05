import type { Metadata } from 'next';
import CheckoutForm from '@/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Order ISRIB A15 — The Synthesis Lab',
  description: 'Research-grade ISRIB A15. Synthesized in-house. 98%+ purity, NMR-verified.',
  robots: 'noindex',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-10">
          <a href="/" className="text-sm text-text-secondary hover:text-accent transition-colors">
            ← Back to ISRIB A15
          </a>
        </div>
        <CheckoutForm />
      </div>
    </main>
  );
}
