'use client';

import { useEffect } from 'react';
import { trackPrelandingView, trackPrelandingCTA } from '@/lib/analytics';

export default function PreLanding() {
  // Track prelanding view on mount
  useEffect(() => {
    trackPrelandingView();
  }, []);

  const handleCTAClick = (location: string) => {
    trackPrelandingCTA(location);
  };

  return (
    <main className="min-h-screen bg-primary">
      {/* Hero Section - Optimized for Above-the-Fold */}
      <section className="relative py-12 md:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-primary to-primary opacity-50"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-center" style={{lineHeight: '1.45', letterSpacing: '-0.1px'}}>
            Your Brain Isn't "Underperforming."
            <br />
            <span className="text-accent">It's Being Biochemically Restricted.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-accent font-semibold mb-4 text-center leading-relaxed">
            For thinkers, builders, founders — those who refuse to operate below their potential.
          </p>
          
          <p className="text-base md:text-lg text-gray-300 mb-6 text-center italic leading-relaxed" style={{lineHeight: '1.7'}}>
            If your thinking feels slower than before — even though your drive and discipline haven't changed — you're in the right place.
          </p>
          
          <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed text-center" style={{lineHeight: '1.7'}}>
            A specific cellular stress-response pathway (ISR) can suppress cognitive clarity, memory recall, and learning efficiency — especially after prolonged stress, overwork, or neurological strain.
          </p>
          
          {/* Social Proof - Factual Context */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 text-sm md:text-base">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-accent text-xl">🔬</span>
              <span><strong className="text-accent">98.7%</strong> HPLC purity</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-accent text-xl">📊</span>
              <span>Used in cognitive research since <strong className="text-accent">2013+</strong></span>
            </div>
          </div>
          
          {/* Moved Qualification Up - with specific behavioral changes */}
          <div className="bg-secondary/60 border border-accent/20 rounded-lg p-4 md:p-6 mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-center">What Changes You'll Notice:</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1 flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-accent text-sm md:text-base">Instead of scattered focus:</p>
                  <p className="text-sm md:text-base text-gray-300">You can sit and actually finish the thing you've been avoiding for weeks.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1 flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-accent text-sm md:text-base">Instead of mental fog:</p>
                  <p className="text-sm md:text-base text-gray-300">Thoughts stop feeling "foggy" — you think in straight lines again.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1 flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-accent text-sm md:text-base">Instead of forced effort:</p>
                  <p className="text-sm md:text-base text-gray-300">Work doesn't feel like pushing a boulder uphill — effort starts to feel natural.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1 flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-accent text-sm md:text-base">Instead of mental fatigue after stress:</p>
                  <p className="text-sm md:text-base text-gray-300">Your thinking used to be sharper — this helps you get that clarity back.</p>
                </div>
              </div>
            </div>
          </div>
          
          
          {/* Why Continue - Reinforcement */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 md:p-5 mb-6 max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              <span className="font-semibold text-accent">Why continue:</span> If you recognize yourself in this pattern, understanding the ISR pathway is likely more important than trying "more stimulants" or "more willpower." This is about removing friction, not pushing harder.
            </p>
          </div>
          
          {/* Primary CTA - Multiple Options */}
          <div className="text-center space-y-3">
            <a 
              href="/"
              onClick={() => handleCTAClick('hero_primary')}
              className="inline-block bg-accent hover:bg-accent-dark text-primary font-bold px-8 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105 text-base md:text-lg w-full md:w-auto"
              style={{boxShadow: '0 4px 14px 0 rgba(0, 217, 255, 0.39)'}}
            >
              See How ISRIB Works in the Brain →
            </a>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="/"
                onClick={() => handleCTAClick('hero_secondary')}
                className="text-accent hover:text-accent-dark font-semibold text-sm underline"
              >
                View the mechanism
              </a>
              <span className="hidden sm:inline text-gray-500">•</span>
              <a 
                href="/"
                onClick={() => handleCTAClick('hero_tertiary')}
                className="text-accent hover:text-accent-dark font-semibold text-sm underline"
              >
                See purity data
              </a>
            </div>
            
            {/* Micro-Guarantee */}
            <p className="text-xs md:text-sm text-gray-400 mt-3">
              No medical claims. Research-only. Full COA inside.
            </p>
          </div>
        </div>
      </section>

      {/* Disqualification Section */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            This Is Not For You If:
          </h2>
          
          <div className="space-y-3 mb-8">
            <div className="bg-secondary/50 p-4 rounded-lg border-l-4 border-red-500/50 flex items-start">
              <span className="text-red-400 text-xl mr-3 mt-1">✗</span>
              <p className="text-base text-gray-300">
                You're looking for a quick dopamine hit or "instant hype"
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg border-l-4 border-red-500/50 flex items-start">
              <span className="text-red-400 text-xl mr-3 mt-1">✗</span>
              <p className="text-base text-gray-300">
                You're not interested in research-grade compounds
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg border-l-4 border-red-500/50 flex items-start">
              <span className="text-red-400 text-xl mr-3 mt-1">✗</span>
              <p className="text-base text-gray-300">
                You expect pharmaceutical or medical claims
              </p>
            </div>
          </div>
          
          <div className="bg-accent/10 border-2 border-accent/30 p-5 rounded-lg mb-6">
            <p className="text-sm text-gray-300 leading-relaxed text-center">
              <strong className="text-accent">Important:</strong> ISRIB A15 is a research compound. It is not approved to diagnose, treat, cure, or prevent any disease. It is intended for scientific investigation only.
            </p>
          </div>
        </div>
      </section>

      {/* The Mechanism */}
      <section id="mechanism" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            The ISR Pathway
          </h2>
          
          <div className="bg-secondary/50 border-l-4 border-accent p-6 md:p-8 rounded-r-lg mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4" style={{lineHeight: '1.7'}}>
              When the Integrated Stress Response activates, protein synthesis in neurons decreases.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{lineHeight: '1.7'}}>
              This affects synaptic plasticity — your brain's ability to form, store, and retrieve information efficiently.
            </p>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What ISRIB A15 Does
          </h2>
          
          <div className="bg-primary p-6 md:p-8 rounded-lg border border-accent/20 mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4" style={{lineHeight: '1.7'}}>
              Evidence suggests it may support the reversal of ISR-related translational suppression, restoring normal synaptic signaling.
            </p>
            <p className="text-lg md:text-xl text-accent leading-relaxed font-semibold" style={{lineHeight: '1.7'}}>
              In simple terms: it may help your brain access clarity it already has, instead of forcing stimulation from the outside.
            </p>
          </div>
          
          {/* Quality Markers with Icons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/30 p-5 rounded-lg border border-accent/20 text-center">
              <div className="text-4xl mb-3">🧪</div>
              <h3 className="font-bold text-accent mb-2">Lab-Verified Purity</h3>
              <p className="text-sm text-gray-300">98.7% HPLC confirmed</p>
            </div>
            
            <div className="bg-secondary/30 p-5 rounded-lg border border-accent/20 text-center">
              <div className="text-4xl mb-3">⚗️</div>
              <h3 className="font-bold text-accent mb-2">Synthesis Control</h3>
              <p className="text-sm text-gray-300">In-house production</p>
            </div>
            
            <div className="bg-secondary/30 p-5 rounded-lg border border-accent/20 text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-bold text-accent mb-2">Storage & QA</h3>
              <p className="text-sm text-gray-300">Amber glass + desiccant</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <a 
              href="/"
              onClick={() => handleCTAClick('mechanism_primary')}
              className="inline-block bg-accent hover:bg-accent-dark text-primary font-bold px-10 md:px-14 py-4 md:py-5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105 text-lg md:text-xl w-full md:w-auto"
              style={{boxShadow: '0 4px 14px 0 rgba(0, 217, 255, 0.39)'}}
            >
              See Full Research & Protocols →
            </a>
            <p className="text-xs md:text-sm text-gray-400 mt-3">
              Complete breakdown • User protocols • Purity verification
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Common Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-primary p-5 rounded-lg border border-accent/20">
              <h3 className="font-bold text-lg text-accent mb-2">Is this legal to buy?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Yes. ISRIB A15 is sold as a research compound for scientific investigation. It is not FDA-approved as a drug or supplement and is not intended for human consumption outside of research contexts.
              </p>
            </div>
            
            <div className="bg-primary p-5 rounded-lg border border-accent/20">
              <h3 className="font-bold text-lg text-accent mb-2">Is it a supplement?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                No. ISRIB A15 is a research chemical, not a dietary supplement. It does not have FDA approval for any medical condition and is not marketed as a treatment.
              </p>
            </div>
            
            <div className="bg-primary p-5 rounded-lg border border-accent/20">
              <h3 className="font-bold text-lg text-accent mb-2">What's included with purchase?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Each order includes the compound (98.7%+ purity), a Certificate of Analysis (COA) with batch-specific testing data, and research documentation on the ISR pathway mechanism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who's Behind This - Final Trust Signal */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/50 border-2 border-accent/30 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-accent">
              Who's Behind This
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-base md:text-lg">
                Synthesis, purification and batch verification (LC-MS / NMR) are handled in-house, rather than outsourced.
              </p>
              
              <p className="text-base md:text-lg font-semibold text-accent">
                Production follows research-grade process controls, not bulk-resale supply.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-accent/20">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚗️</div>
                  <p className="font-semibold text-sm">In-House Synthesis</p>
                  <p className="text-xs text-gray-400">Not resold</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔬</div>
                  <p className="font-semibold text-sm">LC-MS / NMR Verified</p>
                  <p className="text-xs text-gray-400">Every batch</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="font-semibold text-sm">Full Traceability</p>
                  <p className="text-xs text-gray-400">COA included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="py-8 px-4 bg-primary border-t border-accent/20">
        <div className="max-w-3xl mx-auto text-center text-xs md:text-sm text-gray-400">
          <p className="mb-2">
            <strong>Research Compound:</strong> ISRIB A15 is not FDA-approved and is not intended to diagnose, treat, cure, or prevent any disease. Information provided is for educational and research purposes only.
          </p>
          <p className="text-xs text-gray-500">
            By continuing, you acknowledge this is a research compound intended for scientific investigation only.
          </p>
        </div>
      </footer>
    </main>
  );
}
