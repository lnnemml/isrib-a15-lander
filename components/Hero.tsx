'use client';
import { trackButtonClick } from '@/lib/analytics';

interface HeroProps {
  onOpenEmail: () => void;
}

export default function Hero({ onOpenEmail }: HeroProps) {
  const handleCTAClick = (type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      trackButtonClick('Get the Research', 'hero');
      onOpenEmail();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-tertiary via-primary to-primary"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Credibility tag */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-sm text-xs font-bold border border-accent/20 tracking-widest uppercase">
            UCSF Research · In-House Synthesis · NMR Verified
          </span>
        </div>

        {/* Primary headline */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
          Your Brain Isn't Broken.
          <br />
          <span className="text-accent">It's Stuck.</span>
        </h1>

        {/* Subheadline — VOC language */}
        <p className="text-lg md:text-xl text-text-secondary mb-4 leading-relaxed max-w-2xl mx-auto">
          Chronic stress locks a cellular brake that blocks memory formation,
          focus, and clarity — even after rest.
        </p>

        <p className="text-base text-text-secondary mb-10 max-w-xl mx-auto">
          <span className="text-accent font-semibold">ISRIB A15</span> is the compound
          UCSF used to reverse this — in aged, injured, and chronically stressed brains.
        </p>

        {/* Anti-stimulant positioning */}
        <div className="inline-block bg-accent-muted border border-accent/20 px-6 py-3 rounded-sm mb-10">
          <p className="text-sm font-medium">
            <span className="text-accent">Not a stimulant.</span>
            <span className="text-text-secondary"> No buzz. No crash. Restoration at the cellular level.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="#cta-section"
            onClick={(e) => { e.preventDefault(); handleCTAClick('primary'); }}
            className="btn-primary w-full sm:w-auto"
          >
            Order ISRIB A15
          </a>
          <button
            onClick={() => handleCTAClick('secondary')}
            className="btn-secondary w-full sm:w-auto"
          >
            Get the Research First
          </button>
        </div>

        <p className="text-xs text-text-secondary mb-16 tracking-wide">
          98%+ purity · NMR verified · Ships within 48h
        </p>

        {/* Three proof points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              Memory Restored
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              Aged mice (65+ human equivalent) performed like young mice after 3 days.
              Improvements lasted weeks after dosing stopped.
            </p>
          </div>
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              TBI Reversed
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              Brain-injured mice regained normal cognitive function — even when treated
              months after severe injury.
            </p>
          </div>
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              "Totally Benign"
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              "We have never seen any relevant side effects. None." — Dr. Peter Walter, UCSF.
              Currently in human trials at Calico (Google/Alphabet).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
