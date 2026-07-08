'use client';

import { trackProductView, trackBuyClick, trackFormatSwitch } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ProductFormat = 'powder' | 'capsules';

export default function CTASection() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat>('capsules');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (selectedFormat === 'powder') {
              trackProductView('ISRIB A15 500mg', 130, 'powder');
              trackProductView('ISRIB A15 1g', 200, 'powder');
            } else {
              trackProductView('ISRIB A15 25 Capsules', 170, 'capsules');
              trackProductView('ISRIB A15 50 Capsules', 240, 'capsules');
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [selectedFormat]);

  useEffect(() => {
    const savedFormat = localStorage.getItem('preferredFormat') as ProductFormat;
    if (savedFormat) {
      setSelectedFormat(savedFormat);
    }
  }, []);

  const handleFormatSwitch = (newFormat: ProductFormat) => {
    if (newFormat !== selectedFormat) {
      trackFormatSwitch(selectedFormat, newFormat);
      setSelectedFormat(newFormat);
      localStorage.setItem('preferredFormat', newFormat);
    }
  };

  const productIdMap: Record<string, string> = {
    '500mg': '500mg',
    '1g': '1g',
    '25-capsules': '25caps',
    '50-capsules': '50caps',
  };

  const handleBuyClick = (
    product: '500mg' | '1g' | '25-capsules' | '50-capsules',
    price: number,
    location: string
  ) => {
    trackBuyClick(product, price, location, selectedFormat);
    const checkoutProductId = productIdMap[product] ?? '50caps';
    router.push(`/checkout?product=${checkoutProductId}`);
  };

  return (
    <section id="cta-section" className="py-20 px-4 bg-gradient-to-b from-secondary to-primary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-accent/20 border border-accent px-6 py-2 rounded-full mb-4">
            <p className="text-accent font-semibold text-sm">
              Synthesized in-house · NMR verified · Ships within 48h
            </p>
          </div>
          <h2 className="section-heading">
            Choose Your Protocol
          </h2>
          <p className="section-subheading">
            Most people over 50 notice a meaningful difference within the first 5–7 days.
            The Full Protocol gives your brain enough time to fully respond.
          </p>
        </div>

        {/* Capsule Options — primary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Starter Pack */}
          <div className="bg-secondary border-2 border-accent/20 rounded-lg p-8 hover:border-accent transition-all opacity-90">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Starter Pack</h3>
              <div className="mb-2">
                <span className="text-2xl text-gray-500 line-through mr-3">$260</span>
                <span className="text-4xl font-bold text-accent">$170</span>
              </div>
              <div className="inline-block bg-red-500/20 border border-red-500 px-3 py-1 rounded-full mb-2">
                <span className="text-red-400 font-bold text-sm">35% OFF</span>
              </div>
              <p className="text-gray-400">25 capsules · 20mg each</p>
            </div>

            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Pre-measured 20mg doses</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>No scale needed</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>4–5 week protocol</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Easy to dose on-the-go</span>
              </li>
            </ul>

            <button
              onClick={() => handleBuyClick('25-capsules', 170, 'cta_section')}
              className="block btn-primary text-center w-full"
            >
              Order 25 Capsules
            </button>
          </div>

          {/* Full Protocol */}
          <div className="bg-secondary border-2 border-accent rounded-lg p-8 relative hover:scale-105 transition-all shadow-lg shadow-accent/10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent text-primary px-5 py-1.5 rounded-full text-sm font-black tracking-wide uppercase">
                FULL PROTOCOL
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Full Protocol</h3>
              <div className="mb-2">
                <span className="text-2xl text-gray-500 line-through mr-3">$360</span>
                <span className="text-4xl font-bold text-accent">$240</span>
              </div>
              <div className="inline-block bg-red-500/20 border border-red-500 px-3 py-1 rounded-full mb-2">
                <span className="text-red-400 font-bold text-sm">33% OFF</span>
              </div>
              <p className="text-gray-400">50 capsules · 20mg each</p>
            </div>

            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>8–10 week complete protocol</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Best per-capsule value</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Enough time to fully respond</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Travel-friendly packaging</span>
              </li>
            </ul>

            <button
              onClick={() => handleBuyClick('50-capsules', 240, 'cta_section')}
              className="block btn-primary text-center w-full"
            >
              Order 50 Capsules
            </button>
          </div>
        </div>

        {/* Powder — secondary */}
        <div className="mb-8">
          <p className="text-center text-text-secondary text-sm mb-4 font-semibold tracking-wide uppercase">Also available in powder form</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-secondary border border-accent/20 rounded-lg p-6 hover:border-accent/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold">500mg Powder</h4>
                  <p className="text-gray-400 text-sm">~33–50 doses · requires scale</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 line-through text-sm mr-2">$200</span>
                  <span className="text-xl font-bold text-accent">$130</span>
                </div>
              </div>
              <button
                onClick={() => handleBuyClick('500mg', 130, 'cta_section')}
                className="block btn-secondary text-center w-full text-sm py-2"
              >
                Order 500mg Powder
              </button>
            </div>
            <div className="bg-secondary border border-accent/20 rounded-lg p-6 hover:border-accent/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold">1g Powder</h4>
                  <p className="text-gray-400 text-sm">~66–100 doses · best value</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 line-through text-sm mr-2">$300</span>
                  <span className="text-xl font-bold text-accent">$200</span>
                </div>
              </div>
              <button
                onClick={() => handleBuyClick('1g', 200, 'cta_section')}
                className="block btn-secondary text-center w-full text-sm py-2"
              >
                Order 1g Powder
              </button>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-lg mb-4 text-center">What's Included:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>98%+ purity ISRIB A15</span>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>Certificate of Analysis (COA)</span>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>Detailed dosing protocol</span>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>Discreet shipping within 48h</span>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>Email support & troubleshooting</span>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-2">✓</span>
              <span>Research-backed guidance</span>
            </div>
          </div>
        </div>

        <div className="text-center bg-secondary/50 border border-accent/20 p-6 rounded-lg mb-6">
          <p className="text-sm text-gray-300">
            If you follow the protocol for 2 weeks and notice no difference, contact us.
            We'll work something out.
          </p>
        </div>

        <div className="text-center bg-primary p-6 rounded-lg">
          <p className="text-sm text-gray-400">
            <span className="font-semibold">Important:</span> ISRIB A15 is a research compound, not FDA-approved. Intended for personal research use only.
          </p>
        </div>
      </div>
    </section>
  );
}
