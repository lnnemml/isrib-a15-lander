'use client';

import { useState } from 'react';
import { trackEmailCapture } from '@/lib/analytics';

export default function EmailCaptureInline() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://isrib.shop/api/leads?action=subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          source: 'landing',
        }),
      });

      if (!response.ok) throw new Error(`Webhook returned ${response.status}`);

      try {
        trackEmailCapture('landing_page_inline');
      } catch (analyticsError) {
        console.error('Analytics tracking error:', analyticsError);
      }

      setIsSubmitted(true);
      setEmail('');
      setName('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Email submission error:', err);
      setError('Something went wrong. Please try again.');
      setTimeout(async () => {
        try {
          const retryResponse = await fetch('https://isrib.shop/api/leads?action=subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email.trim().toLowerCase(),
              name: name.trim(),
              source: 'landing',
            }),
          });
          if (retryResponse.ok) {
            setError('');
            setIsSubmitted(true);
            setEmail('');
            setName('');
            setTimeout(() => setIsSubmitted(false), 5000);
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-secondary to-primary border-2 border-accent/30 rounded-lg p-10 text-center">
          {!isSubmitted ? (
            <>
              <p className="text-xs text-accent uppercase tracking-widest font-bold mb-4">Not ready yet?</p>
              <h2 className="text-3xl font-black mb-3">
                Get the research.
              </h2>
              <p className="text-text-secondary mb-8">
                We'll send you the UCSF findings, real user experiences from people 50+,
                and the complete dosing protocol. No spam.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col gap-3 mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your first name"
                    maxLength={50}
                    className="w-full px-5 py-4 bg-primary border-2 border-accent/30 rounded-lg text-white text-base focus:outline-none focus:border-accent transition-all"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full px-5 py-4 bg-primary border-2 border-accent/30 rounded-lg text-white text-base focus:outline-none focus:border-accent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Get the Protocol'}
                  </button>
                </div>
                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                <p className="text-xs text-gray-400">4 emails over 3 days. Unsubscribe anytime.</p>
              </form>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Check Your Email</h3>
              <p className="text-gray-300">Email #1 arriving in the next few minutes.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
