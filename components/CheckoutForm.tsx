'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { PRODUCTS, getCryptoPrice } from '@/lib/products';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'Canada', 'Australia',
  'France', 'Netherlands', 'Sweden', 'Switzerland', 'Poland',
  'Ukraine', 'Czech Republic', 'Austria', 'Belgium', 'Denmark',
  'Finland', 'Norway', 'Spain', 'Italy', 'Portugal',
  'New Zealand', 'Singapore', 'Japan', 'South Korea', 'Israel',
  'Brazil', 'Mexico', 'Argentina', 'South Africa', 'Other',
];

type PaymentMethod = 'crypto' | 'manual';
type FormState = 'idle' | 'loading' | 'crypto_redirect' | 'manual_pending' | 'error';

interface FormData {
  firstName: string;
  email: string;
  country: string;
  productId: string;
  paymentMethod: PaymentMethod;
}

function getStoredTracking() {
  if (typeof window === 'undefined') return {};
  try {
    const utm = JSON.parse(localStorage.getItem('isrib_utm') ?? '{}');
    const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1] ?? '';
    const fbc = document.cookie.match(/_fbc=([^;]+)/)?.[1] ?? '';
    const gaClientId = (window as unknown as Record<string, unknown>)['ga_client_id'] as string ?? '';
    return {
      utmSource: utm.utm_source ?? '',
      utmMedium: utm.utm_medium ?? '',
      utmCampaign: utm.utm_campaign ?? '',
      utmContent: utm.utm_content ?? '',
      fbp,
      fbc,
      gaClientId,
    };
  } catch {
    return {};
  }
}

function fireBeginCheckout() {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem('_capi_begin_checkout')) return;
  sessionStorage.setItem('_capi_begin_checkout', '1');

  const tracking = getStoredTracking() as Record<string, string>;
  const blob = new Blob(
    [JSON.stringify({
      event: 'begin_checkout',
      fbp: tracking.fbp,
      fbc: tracking.fbc,
      source_url: window.location.href,
    })],
    { type: 'application/json' }
  );
  navigator.sendBeacon('https://isrib-analytics-api-fbqy.vercel.app/api/funnel-event', blob);

  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).dataLayer) {
    ((window as unknown as Record<string, unknown>).dataLayer as unknown[]).push({ event: 'begin_checkout' });
  }
}

function fireOrderSubmitted(
  orderId: string,
  value: number,
  email: string,
  paymentMethod: 'crypto' | 'manual'
) {
  if (typeof window === 'undefined') return;
  const tracking = getStoredTracking() as Record<string, string>;

  const isRealConversion = paymentMethod === 'manual';

  // 1. Browser Meta Pixel
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    if (isRealConversion) {
      // Manual: fire Purchase immediately — best proxy we have
      ((window as unknown as Record<string, unknown>).fbq as Function)(
        'track',
        'Purchase',
        { value, currency: 'USD', content_ids: [orderId], content_type: 'product' },
        { eventID: orderId }
      );
    } else {
      // Crypto: fire InitiateCheckout — real Purchase comes from webhook
      ((window as unknown as Record<string, unknown>).fbq as Function)(
        'track',
        'InitiateCheckout',
        { value, currency: 'USD', content_ids: [orderId] },
        { eventID: `ic_${orderId}` }
      );
    }
  }

  // 2. GTM dataLayer
  if (Array.isArray((window as unknown as Record<string, unknown>).dataLayer)) {
    ((window as unknown as Record<string, unknown>).dataLayer as unknown[]).push({
      event: isRealConversion ? 'purchase' : 'initiate_checkout',
      order_id: orderId,
      value,
      currency: 'USD',
      payment_method: paymentMethod,
      ...tracking,
    });
  }

  // 3. Server-side CAPI
  const capiEndpoint = isRealConversion
    ? 'https://isrib-analytics-api-fbqy.vercel.app/api/confirm-purchase'
    : 'https://isrib-analytics-api-fbqy.vercel.app/api/funnel-event';

  const capiPayload = isRealConversion
    ? {
        orderId,
        value,
        currency: 'USD',
        email,
        fbp: tracking.fbp ?? '',
        fbc: tracking.fbc ?? '',
        source: 'order_submitted_manual',
      }
    : {
        event: 'begin_checkout',
        orderId,
        value,
        fbp: tracking.fbp ?? '',
        fbc: tracking.fbc ?? '',
        source_url: window.location.href,
        event_id: `ic_${orderId}`,
      };

  const blob = new Blob([JSON.stringify(capiPayload)], { type: 'application/json' });
  navigator.sendBeacon(capiEndpoint, blob);
}

export default function CheckoutForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [hasTrackedBegin, setHasTrackedBegin] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: '',
    email: '',
    country: '',
    productId: '50caps',
    paymentMethod: 'crypto',
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('product');
    if (p && PRODUCTS.find((pr) => pr.id === p)) {
      setForm((prev) => ({ ...prev, productId: p }));
    }
  }, []);

  const firstFieldRef = useRef(false);

  const handleFirstFocus = useCallback(() => {
    if (firstFieldRef.current) return;
    firstFieldRef.current = true;
    if (!hasTrackedBegin) {
      setHasTrackedBegin(true);
      fireBeginCheckout();
    }
  }, [hasTrackedBegin]);

  const selectedProduct = PRODUCTS.find((p) => p.id === form.productId) ?? PRODUCTS[3];
  const price = form.paymentMethod === 'crypto'
    ? getCryptoPrice(selectedProduct.price)
    : selectedProduct.price;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    const tracking = getStoredTracking();

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...tracking }),
      });

      const data = await res.json() as {
        success?: boolean;
        orderId?: string;
        invoiceUrl?: string;
        amountChargedUsd?: number;
        error?: string;
      };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      fireOrderSubmitted(data.orderId!, data.amountChargedUsd!, form.email, form.paymentMethod);
      setOrderId(data.orderId!);

      if (form.paymentMethod === 'crypto' && data.invoiceUrl) {
        setFormState('crypto_redirect');
        setTimeout(() => {
          window.location.href = data.invoiceUrl!;
        }, 1200);
      } else {
        setFormState('manual_pending');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setFormState('error');
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Success: crypto redirect state
  if (formState === 'crypto_redirect') {
    return (
      <div className="card text-center py-16">
        <div className="text-accent text-4xl mb-6">→</div>
        <h2 className="section-heading mb-3">Redirecting to payment...</h2>
        <p className="text-text-secondary text-sm">
          Order ID: <span className="font-mono text-accent">{orderId}</span>
        </p>
        <p className="text-text-secondary text-sm mt-2">
          A confirmation email is on its way.
        </p>
      </div>
    );
  }

  // Success: manual payment instructions
  if (formState === 'manual_pending') {
    return (
      <div className="card">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#1f1a0d',
            border: '1px solid #E8A427',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            marginBottom: 24,
          }}
        >
          ✓
        </div>

        <p style={{ color: '#E8A427', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>
          Order Received
        </p>

        <h2 style={{ color: '#f5f5f0', fontSize: 22, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.3 }}>
          Check your email.
        </h2>

        <p style={{ color: '#888', fontSize: 14, margin: '0 0 28px' }}>
          Order ID: <span style={{ color: '#E8A427', fontFamily: 'monospace' }}>{orderId}</span>
        </p>

        <p style={{ color: '#b0b0b0', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>
          We&apos;ve sent payment instructions to your email — PayPal, USDT, BTC,
          and LTC details are all there. After sending payment, reply to that email
          with a screenshot or transaction ID so we can confirm faster.
        </p>

        <div
          style={{
            background: '#1a1a20',
            border: '1px solid #2a2a30',
            borderRadius: 8,
            padding: '14px 18px',
            marginBottom: 24,
          }}
        >
          <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            Once we receive payment, we&apos;ll confirm your order and reach out for
            your shipping address. Typical processing: 1–3 business days.
          </p>
        </div>

        <a
          href="/"
          style={{ color: '#555', fontSize: 13, textDecoration: 'none' }}
        >
          ← Back to ISRIB A15
        </a>
      </div>
    );
  }

  // Main form
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#f5f5f0] text-2xl font-bold mb-1">Order ISRIB A15</h1>
        <p className="text-text-secondary text-sm">Research compound · 98%+ purity · NMR-verified</p>
      </div>

      {/* Product selector */}
      <div className="mb-6">
        <label className="block text-xs text-text-secondary uppercase tracking-widest mb-3">
          Select product
        </label>
        <div className="grid grid-cols-1 gap-2">
          {PRODUCTS.map((product) => {
            const selected = form.productId === product.id;
            const displayPrice = form.paymentMethod === 'crypto'
              ? getCryptoPrice(product.price)
              : product.price;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => update('productId', product.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                  selected
                    ? 'border-accent bg-[#1f1a0d] text-[#f5f5f0]'
                    : 'border-[#2a2a30] bg-[#141418] text-text-secondary hover:border-[#3a3a40]'
                }`}
              >
                <div>
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="block text-xs mt-0.5 opacity-70">{product.description}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${selected ? 'text-accent' : ''}`}>
                    ${displayPrice}
                  </span>
                  {form.paymentMethod === 'crypto' && (
                    <span className="block text-xs line-through opacity-40">${product.price}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment method toggle */}
      <div className="mb-6">
        <label className="block text-xs text-text-secondary uppercase tracking-widest mb-3">
          Payment method
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['crypto', 'manual'] as PaymentMethod[]).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => update('paymentMethod', method)}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                form.paymentMethod === method
                  ? 'border-accent bg-[#1f1a0d] text-[#f5f5f0]'
                  : 'border-[#2a2a30] bg-[#141418] text-text-secondary hover:border-[#3a3a40]'
              }`}
            >
              {method === 'crypto' ? (
                <>Crypto <span className="text-accent font-bold text-xs">−10%</span></>
              ) : (
                'Manual transfer'
              )}
            </button>
          ))}
        </div>
        {form.paymentMethod === 'crypto' && (
          <p className="text-xs text-text-secondary mt-2">
            Paid automatically via NowPayments · BTC, ETH, USDT and 50+ coins
          </p>
        )}
        {form.paymentMethod === 'manual' && (
          <p className="text-xs text-text-secondary mt-2">
            PayPal · SEPA · SWIFT · Crypto (self-custody) · Western Union
          </p>
        )}
      </div>

      {/* Contact fields */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs text-text-secondary uppercase tracking-widest mb-1.5">
            First name
          </label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            onFocus={handleFirstFocus}
            placeholder="Alex"
            className="w-full bg-[#141418] border border-[#2a2a30] rounded-lg px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#444] focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs text-text-secondary uppercase tracking-widest mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onFocus={handleFirstFocus}
            placeholder="alex@example.com"
            className="w-full bg-[#141418] border border-[#2a2a30] rounded-lg px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#444] focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs text-text-secondary uppercase tracking-widest mb-1.5">
            Country
          </label>
          <select
            required
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            onFocus={handleFirstFocus}
            className="w-full bg-[#141418] border border-[#2a2a30] rounded-lg px-4 py-3 text-sm text-[#f5f5f0] focus:outline-none focus:border-accent transition-colors appearance-none"
          >
            <option value="" disabled>Select country...</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-[#1a1a20] border border-[#2a2a30] rounded-lg px-4 py-3 mb-6 flex items-center justify-between text-sm">
        <span className="text-text-secondary">Total</span>
        <div className="text-right">
          <span className="text-[#f5f5f0] font-bold text-base">${price} USD</span>
          {form.paymentMethod === 'crypto' && (
            <span className="block text-xs text-text-secondary line-through">${selectedProduct.price}</span>
          )}
        </div>
      </div>

      {/* Error message */}
      {formState === 'error' && (
        <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-800/50 rounded-lg text-red-300 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'loading'}
        className="btn-primary w-full py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formState === 'loading'
          ? 'Processing...'
          : form.paymentMethod === 'crypto'
          ? `Pay $${price} with Crypto →`
          : `Place Order — $${price} →`}
      </button>

      <p className="text-center text-xs text-text-secondary mt-4 leading-relaxed">
        Research compound · For laboratory use · By placing an order you confirm you are 18+
      </p>
    </form>
  );
}
