'use client';

import { trackProductView, trackBuyClick, trackFormatSwitch } from '@/lib/analytics';
import { useEffect, useState } from 'react';

// Declare gtag as global


type ProductFormat = 'powder' | 'capsules';

export default function CTASection() {
  // Default to capsules як ви просили
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat>('capsules');

  // Track product view when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Track views для поточного формату
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

  // Load saved preference from localStorage
  useEffect(() => {
    const savedFormat = localStorage.getItem('preferredFormat') as ProductFormat;
    if (savedFormat) {
      setSelectedFormat(savedFormat);
    }
  }, []);

  const handleFormatSwitch = (newFormat: ProductFormat) => {
    if (newFormat !== selectedFormat) {
      // Track format switch
      trackFormatSwitch(selectedFormat, newFormat);
      
      // Update state
      setSelectedFormat(newFormat);
      
      // Save to localStorage
      localStorage.setItem('preferredFormat', newFormat);
    }
  };

  const handleBuyClick = (
    product: '500mg' | '1g' | '25-capsules' | '50-capsules',
    price: number,
    location: string
  ) => {
    // Track buy click FIRST (before redirect)
    trackBuyClick(product, price, location, selectedFormat);
    
    // Get UTM parameters from current URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'direct';
    const utmCampaign = urlParams.get('utm_campaign') || 'none';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmContent = urlParams.get('utm_content') || '';
    
    // Build checkout URL with all attribution data
    const checkoutUrl = new URL(`https://isrib.shop/buy-${product}.html`);
    checkoutUrl.searchParams.set('product', product);
    checkoutUrl.searchParams.set('amount', price.toString());
    checkoutUrl.searchParams.set('format', selectedFormat);
    checkoutUrl.searchParams.set('utm_source', utmSource);
    checkoutUrl.searchParams.set('utm_campaign', utmCampaign);
    if (utmMedium) checkoutUrl.searchParams.set('utm_medium', utmMedium);
    if (utmContent) checkoutUrl.searchParams.set('utm_content', utmContent);
    
    // Try to get linker param (but don't wait for it)
    let linkerParam: string | null = null;
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined' && gaId) {
      try {
        window.gtag('get', gaId, 'linker_param', (lp: string) => {
          if (lp) {
            linkerParam = lp;
            console.log('[Analytics] Got linker param:', lp);
          }
        });
      } catch (error) {
        console.warn('[Analytics] Error getting linker param:', error);
      }
    }
    
    // Wait 150ms for linker param, then redirect anyway
    setTimeout(() => {
      if (linkerParam) {
        checkoutUrl.searchParams.set('_gl', linkerParam);
        console.log('[Analytics] Redirecting with linker param');
      } else {
        console.log('[Analytics] Redirecting without linker param');
      }
      window.location.href = checkoutUrl.toString();
    }, 150);
  };

  return (
    <section id="cta-section" className="py-20 px-4 bg-gradient-to-b from-secondary to-primary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-accent/20 border border-accent px-6 py-2 rounded-full mb-4">
            <p className="text-accent font-semibold text-sm">
              ⚡ Intro Offer: Limited Research Batch
            </p>
          </div>
          <h2 className="section-heading">
            Ready to Release the Brake?
          </h2>
          <p className="section-subheading">
            Start with ISRIB A15 — the optimized analog designed for human use.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Early access for researchers only • Ships within 48 hours
          </p>

          {/* Format Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-secondary border-2 border-accent/30 rounded-lg p-1">
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
            </div>
          </div>
        </div>
        
        {/* Powder Options */}
        {selectedFormat === 'powder' && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 500mg Option */}
            <div className="bg-secondary border-2 border-accent/30 rounded-lg p-8 hover:border-accent transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Start Here</h3>
                <div className="mb-2">
                  <span className="text-2xl text-gray-500 line-through mr-3">$200</span>
                  <span className="text-4xl font-bold text-accent">$130</span>
                </div>
                <div className="inline-block bg-red-500/20 border border-red-500 px-3 py-1 rounded-full mb-2">
                  <span className="text-red-400 font-bold text-sm">35% OFF</span>
                </div>
                <p className="text-gray-400">500mg powder • ~33-50 doses</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Perfect for first-time trial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>4-6 week protocol</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>See if ISRIB works for you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Requires milligram scale</span>
                </li>
              </ul>
              
              <a 
                href="https://isrib.shop/buy-500mg.html" 
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyClick('500mg', 130, 'cta_section');
                }}
                className="block btn-primary text-center"
              >
                Order 500mg Powder
              </a>
            </div>
            
            {/* 1g Option */}
            <div className="bg-secondary border-2 border-accent rounded-lg p-8 relative hover:scale-105 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Full Protocol</h3>
                <div className="mb-2">
                  <span className="text-2xl text-gray-500 line-through mr-3">$300</span>
                  <span className="text-4xl font-bold text-accent">$200</span>
                </div>
                <div className="inline-block bg-red-500/20 border border-red-500 px-3 py-1 rounded-full mb-2">
                  <span className="text-red-400 font-bold text-sm">33% OFF</span>
                </div>
                <p className="text-gray-400">1000mg powder • ~66-100 doses</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>8-12 week complete protocol</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Best per-dose value</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Includes cycling strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Requires milligram scale</span>
                </li>
              </ul>
              
              <a 
                href="https://isrib.shop/buy-1g.html" 
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyClick('1g', 200, 'cta_section');
                }}
                className="block btn-primary text-center"
              >
                Order 1g Powder
              </a>
            </div>
          </div>
        )}

        {/* Capsules Options */}
        {selectedFormat === 'capsules' && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 25 Capsules Option */}
            <div className="bg-secondary border-2 border-accent/30 rounded-lg p-8 hover:border-accent transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter Pack</h3>
                <div className="mb-2">
                  <span className="text-2xl text-gray-500 line-through mr-3">$260</span>
                  <span className="text-4xl font-bold text-accent">$170</span>
                </div>
                <div className="inline-block bg-red-500/20 border border-red-500 px-3 py-1 rounded-full mb-2">
                  <span className="text-red-400 font-bold text-sm">35% OFF</span>
                </div>
                <p className="text-gray-400">25 capsules • 20mg each</p>
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
                  <span>4-5 week protocol</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Easy to dose on-the-go</span>
                </li>
              </ul>
              
              <a 
                href="https://isrib.shop/buy-25-capsules.html" 
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyClick('25-capsules', 170, 'cta_section');
                }}
                className="block btn-primary text-center"
              >
                Order 25 Capsules
              </a>
            </div>
            
            {/* 50 Capsules Option */}
            <div className="bg-secondary border-2 border-accent rounded-lg p-8 relative hover:scale-105 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
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
                <p className="text-gray-400">50 capsules • 20mg each</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>8-10 week complete protocol</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Best per-capsule value</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Maximum convenience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Travel-friendly packaging</span>
                </li>
              </ul>
              
              <a 
                href="https://isrib.shop/buy-50-capsules.html" 
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyClick('50-capsules', 240, 'cta_section');
                }}
                className="block btn-primary text-center"
              >
                Order 50 Capsules
              </a>
            </div>
          </div>
        )}
        
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
          <p className="text-sm text-gray-300 mb-2">
            <span className="font-semibold text-accent">Purity verified.</span> Discreet shipping.
          </p>
        </div>
        
        <div className="text-center bg-primary p-6 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">
            <span className="font-semibold">Important:</span> ISRIB A15 is a research compound, not FDA-approved. Intended for personal research use only.
          </p>
          <p className="text-sm text-gray-400">
            Follow the protocol for 2 weeks. If you notice no cognitive improvement, contact us — we'll troubleshoot together.
          </p>
        </div>
      </div>
    </section>
  );
}
