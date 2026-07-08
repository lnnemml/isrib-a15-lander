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
      trackButtonClick('Read the Research', 'hero');
      const evidenceSection = document.getElementById('evidence');
      if (evidenceSection) evidenceSection.scrollIntoView({ behavior: 'smooth' });
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
          Your Brain at 55 Isn't Declining.
          <br />
          <span className="text-accent">It's Blocked.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
          Scientists at UCSF discovered that age-related memory loss isn't permanent damage —
          it's a reversible cellular blockage. ISRIB A15 was synthesized to release it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="#cta-section"
            onClick={(e) => { e.preventDefault(); handleCTAClick('primary'); }}
            className="btn-primary w-full sm:w-auto"
          >
            Start Your Protocol →
          </a>
          <button
            onClick={() => handleCTAClick('secondary')}
            className="btn-secondary w-full sm:w-auto"
          >
            Read the research ↓
          </button>
        </div>

        <p className="text-xs text-text-secondary mb-16 tracking-wide">
          98%+ purity · NMR verified · Ships within 48h
        </p>

        {/* Three proof points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              Developed from UCSF research
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              Synthesized from the ISRIB molecule discovered by Dr. Peter Walter's lab at UCSF.
              Peer-reviewed in Science and eLife.
            </p>
          </div>
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              Non-stimulant. No crash.
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              Does not affect heart rate, blood pressure, or sleep.
              Works by restoring cellular function — not by stimulating or sedating.
            </p>
          </div>
          <div className="bg-tertiary border border-accent/50 rounded-lg p-6">
            <div className="text-accent font-black text-xs uppercase tracking-widest mb-3">
              Felt within days, not weeks
            </div>
            <p className="text-text-primary text-sm leading-relaxed">
              Most users report the first noticeable changes between days 3–7.
              Clarity and word recall tend to come first.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
