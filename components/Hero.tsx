'use client';

import { trackButtonClick, trackBuyClick } from '@/lib/analytics';
import { appendTrackingParams } from '@/utils/cross-domain-linker';



interface HeroProps {
  onOpenEmail: () => void;
}

export default function Hero({ onOpenEmail }: HeroProps) {
  const handleCTAClick = async (type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      // This is a buy button, track it properly
      trackBuyClick('1g', 200, 'hero');

      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direct';
      const utmCampaign = urlParams.get('utm_campaign') || 'none';
      const utmMedium = urlParams.get('utm_medium') || '';
      const utmContent = urlParams.get('utm_content') || '';

      // Redirect to checkout with attribution
      const checkoutUrl = new URL('https://isrib.shop/buy-1g.html');
      checkoutUrl.searchParams.set('product', '1g');
      checkoutUrl.searchParams.set('amount', '200');
      checkoutUrl.searchParams.set('utm_source', utmSource);
      checkoutUrl.searchParams.set('utm_campaign', utmCampaign);
      if (utmMedium) checkoutUrl.searchParams.set('utm_medium', utmMedium);
      if (utmContent) checkoutUrl.searchParams.set('utm_content', utmContent);

      // Append tracking parameters (fbp, fbc, gacid) and redirect
      const baseUrl = checkoutUrl.toString();
      const enhancedUrl = await appendTrackingParams(baseUrl);
      window.location.href = enhancedUrl;
    } else {
      trackButtonClick('Get the Full Story', 'hero');
      onOpenEmail();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-primary to-primary opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/30">
            UCSF-Discovered • Biohacker-Proven
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Your Brain Isn't Broken.
          <br />
          <span className="text-accent">It's Stuck.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto">
          ISRIB A15 releases the hidden brake blocking your memory, focus, and mental clarity, restoring the cognitive performance you thought you lost.
        </p>
        
        <p className="text-lg md:text-xl text-accent font-semibold mb-6 max-w-2xl mx-auto">
          Unlock memory, focus, and clarity within days.
        </p>
        
        <div className="inline-block bg-accent/10 border border-accent/30 px-6 py-3 rounded-lg mb-8">
          <p className="text-gray-300 text-sm md:text-base">
            <span className="font-semibold text-accent">It's not a stimulant.</span> It's restoration.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a 
            href="https://isrib.shop/buy-1g.html"
            onClick={() => handleCTAClick('primary')}
            className="btn-primary w-full sm:w-auto"
          >
            Try ISRIB A15
          </a>
          <button 
            onClick={() => {
              handleCTAClick('secondary');
              onOpenEmail();
            }}
            className="btn-secondary w-full sm:w-auto"
          >
            Get the Full Story
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-12">
          Purity verified • Discreet shipping
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
            <div className="text-accent font-bold text-lg mb-2">Memory Restored</div>
            <p className="text-gray-400 text-sm">Old mice performed like young ones after just 3 days</p>
          </div>
          <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
            <div className="text-accent font-bold text-lg mb-2">TBI Reversed</div>
            <p className="text-gray-400 text-sm">Brain-injured mice regained normal cognitive function</p>
          </div>
          <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
            <div className="text-accent font-bold text-lg mb-2">Zero Toxicity</div>
            <p className="text-gray-400 text-sm">"Totally benign" - UCSF Lead Researcher</p>
          </div>
        </div>
      </div>
    </section>
  );
}
