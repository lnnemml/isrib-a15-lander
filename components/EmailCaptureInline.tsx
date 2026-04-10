'use client';

import { useState } from 'react';

export default function EmailCaptureInline() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send to n8n webhook
      const response = await fetch('https://isrib.app.n8n.cloud/webhook/isrib-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          source: 'landing_page_inline',
          timestamp: new Date().toISOString(),
          utm_source: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') : null,
          utm_medium: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_medium') : null,
          utm_campaign: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') : null,
          page_url: typeof window !== 'undefined' ? window.location.href : null,
        }),
      });
      
      // Check if webhook accepted the request
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        throw new Error(`Webhook returned ${response.status}`);
      }
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Email submission error:', err);
      setError('Something went wrong. Please try again.');
      
      // Auto-retry once after 1 second
      setTimeout(async () => {
        try {
          const retryResponse = await fetch('https://isrib.app.n8n.cloud/webhook/isrib-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email.trim().toLowerCase(),
              source: 'landing_page_inline_retry',
              timestamp: new Date().toISOString(),
            }),
          });
          
          if (retryResponse.ok) {
            setError('');
            setIsSubmitted(true);
            setEmail('');
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
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-secondary to-primary border-2 border-accent/30 rounded-lg p-12 text-center">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not Ready to Buy Yet?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get our free 4-day email series on how ISRIB works, user experiences, and exact protocols.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 bg-primary border-2 border-accent/30 rounded-lg text-white text-lg focus:outline-none focus:border-accent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary whitespace-nowrap"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Me the Series'}
                  </button>
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm mb-2">{error}</p>
                )}
                
                <p className="text-xs text-gray-400">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start">
                  <span className="text-accent mr-3 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Day 1: The ISR Mechanism</p>
                    <p className="text-xs text-gray-400">Why your brain is stuck</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-accent mr-3 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Day 2: The Discovery</p>
                    <p className="text-xs text-gray-400">UCSF's breakthrough</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-accent mr-3 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-sm">Day 3: User Results</p>
                    <p className="text-xs text-gray-400">Real experiences</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Check Your Email!</h3>
              <p className="text-xl text-gray-300">
                Email #1 is on its way. Check your inbox in the next few minutes.
              </p>
              <p className="text-sm text-gray-400 mt-4">
                (Don't forget to check spam if you don't see it)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
