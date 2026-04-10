'use client';

import { useState } from 'react';
import { trackEmailCapture } from '@/lib/analytics';

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailCapture({ isOpen, onClose }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
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
          source: 'landing_page_modal',
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
      
      // Track email capture in analytics
      try {
        trackEmailCapture('landing_page_modal');
      } catch (analyticsError) {
        console.error('Analytics tracking error:', analyticsError);
        // Don't fail the submission if analytics fails
      }
      
      setIsSubmitted(true);
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail('');
        setError('');
      }, 2500);
    } catch (error) {
      console.error('Email submission error:', error);
      setError('Failed to subscribe. Please try again.');
      
      // Auto-retry once after 1 second
      setTimeout(async () => {
        try {
          const retryResponse = await fetch('https://isrib.app.n8n.cloud/webhook/isrib-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email.trim().toLowerCase(),
              source: 'landing_page_modal_retry',
              timestamp: new Date().toISOString(),
            }),
          });
          
          if (retryResponse.ok) {
            setError('');
            setIsSubmitted(true);
            setTimeout(() => {
              onClose();
              setIsSubmitted(false);
              setEmail('');
            }, 2500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-secondary border-2 border-accent/30 rounded-lg max-w-lg w-full p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Get the Complete ISRIB Story
            </h2>
            <p className="text-gray-300 mb-6">
              Join our 4-day email series and discover:
            </p>
            
            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Why your brain is stuck in "safe mode"</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>The UCSF discovery that reversed brain injury</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Real user experiences (first 72 hours)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Exact dosing protocol to get started</span>
              </li>
            </ul>
            
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-primary border border-accent/30 rounded-lg mb-4 text-white focus:outline-none focus:border-accent"
              />
              
              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? 'Sending...' : 'Send Me the Series'}
              </button>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Check Your Email</h3>
            <p className="text-gray-300">
              Email #1 arriving in the next few minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
