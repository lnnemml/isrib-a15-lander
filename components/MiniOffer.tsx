'use client';

import { trackBuyClick, trackProductView } from '@/lib/analytics';
import { appendTrackingParams } from '@/utils/cross-domain-linker';
import { useEffect, useState } from 'react';

type ProductFormat = 'powder' | 'capsules';

export default function MiniOffer() {
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat>('capsules');

  useEffect(() => {
    const saved = localStorage.getItem('preferredFormat') as ProductFormat;
    if (saved) setSelectedFormat(saved);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (selectedFormat === 'capsules') {
              trackProductView('ISRIB A15 25 Capsules', 170, 'capsules');
              trackProductView('ISRIB A15 50 Capsules', 240, 'capsules');
            } else {
              trackProductView('ISRIB A15 500mg', 130, 'powder');
              trackProductView('ISRIB A15 1g', 200, 'powder');
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    const section = document.getElementById('mini-offer-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [selectedFormat]);

  const handleBuyClick = async (
    product: '500mg' | '1g' | '25-capsules' | '50-capsules',
    price: number
  ) => {
    trackBuyClick(product, price, 'mini_offer_section', selectedFormat);

    const urlParams = new URLSearchParams(window.location.search);
    const checkoutUrl = new URL(`https://isrib.shop/buy-${product}.html`);
    checkoutUrl.searchParams.set('product', product);
    checkoutUrl.searchParams.set('amount', price.toString());
    checkoutUrl.searchParams.set('format', selectedFormat);
    checkoutUrl.searchParams.set('utm_source', urlParams.get('utm_source') || 'direct');
    checkoutUrl.searchParams.set('utm_campaign', urlParams.get('utm_campaign') || 'none');
    const utmMedium = urlParams.get('utm_medium');
    const utmContent = urlParams.get('utm_content');
    if (utmMedium) checkoutUrl.searchParams.set('utm_medium', utmMedium);
    if (utmContent) checkoutUrl.searchParams.set('utm_content', utmContent);

    const enhanced = await appendTrackingParams(checkoutUrl.toString());
    window.location.href = enhanced;
  };

  const handleFormatSwitch = (fmt: ProductFormat) => {
    setSelectedFormat(fmt);
    localStorage.setItem('preferredFormat', fmt);
  };

  return (
    <section id="mini-offer-section" className="py-20 px-4 bg-primary">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <p className="text-xs text-accent uppercase tracking-widest font-bold mb-3">Order ISRIB A15</p>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Ready to start your protocol?
          </h2>
          <p className="text-text-secondary mb-2">
            Synthesized in-house · NMR verified · Ships within 48h
          </p>
          <p className="text-sm text-accent font-semibold mb-6">
            AMSBIO charges $415 for 50mg. You're getting 1g — ~20× more compound — for $200.
          </p>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-secondary border-2 border-accent/30 rounded-lg p-1">
              <button
                onClick={() => handleFormatSwitch('capsules')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFormat === 'capsules'
                    ? 'bg-accent text-primary shadow-lg'
                    : 'text-gray-300 hover:text-accent'
                }`}
              >
                Capsules
              </button>
              <button
                onClick={() => handleFormatSwitch('powder')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFormat === 'powder'
                    ? 'bg-accent text-primary shadow-lg'
                    : 'text-gray-300 hover:text-accent'
                }`}
              >
                Powder
              </button>
            </div>
          </div>
        </div>

        {selectedFormat === 'capsules' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary border-2 border-accent/30 rounded-lg p-8 opacity-90">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter Pack</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-accent">$170</span>
                </div>
                <p className="text-gray-400 text-sm">25 capsules · 20mg each</p>
                <p className="text-gray-400 text-sm">~5 week supply (5 days on, 2 days off)</p>
              </div>
              <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Pre-measured 20mg doses</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>No scale needed</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>NMR certificate included</li>
              </ul>
              <button
                onClick={() => handleBuyClick('25-capsules', 170)}
                className="block w-full btn-primary text-center"
              >
                Order Starter Pack
              </button>
            </div>

            <div className="bg-secondary border-2 border-accent rounded-lg p-8 relative shadow-lg shadow-accent/10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-primary px-5 py-1.5 rounded-full text-sm font-black tracking-wide uppercase">
                  Recommended
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Full Protocol</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-accent">$240</span>
                </div>
                <p className="text-gray-400 text-sm">50 capsules · 20mg each</p>
                <p className="text-gray-400 text-sm">~10 week supply (5 days on, 2 days off)</p>
              </div>
              <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Pre-measured 20mg doses</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Best per-capsule value</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>NMR certificate included</li>
              </ul>
              <button
                onClick={() => handleBuyClick('50-capsules', 240)}
                className="block w-full btn-primary text-center"
              >
                Order Full Protocol
              </button>
            </div>
          </div>
        )}

        {selectedFormat === 'powder' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary border-2 border-accent/30 rounded-lg p-8 opacity-90">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter Pack</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-accent">$130</span>
                </div>
                <p className="text-gray-400 text-sm">500mg powder · ~25 doses at 20mg</p>
                <p className="text-gray-400 text-sm">~5 week supply (5 days on, 2 days off)</p>
              </div>
              <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Same protocol, you measure</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Requires milligram-accurate scale</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>NMR certificate included</li>
              </ul>
              <button
                onClick={() => handleBuyClick('500mg', 130)}
                className="block w-full btn-primary text-center"
              >
                Order 500mg Powder
              </button>
            </div>

            <div className="bg-secondary border-2 border-accent rounded-lg p-8 relative shadow-lg shadow-accent/10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-primary px-5 py-1.5 rounded-full text-sm font-black tracking-wide uppercase">
                  Best Value
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Full Protocol</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-accent">$200</span>
                </div>
                <p className="text-gray-400 text-sm">1g powder · ~50 doses at 20mg</p>
                <p className="text-gray-400 text-sm">~10 week supply (5 days on, 2 days off)</p>
              </div>
              <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Same protocol, you measure</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>Best per-dose value</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span>NMR certificate included</li>
              </ul>
              <button
                onClick={() => handleBuyClick('1g', 200)}
                className="block w-full btn-primary text-center"
              >
                Order 1g Powder
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-text-secondary mt-6">
          <a href="#cta-section" className="text-accent hover:underline">See full product details and what's included ↓</a>
        </p>

      </div>
    </section>
  );
}
