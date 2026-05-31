'use client';
import { useEffect } from 'react';
import { trackPrelandingView, trackPrelandingCTA } from '@/lib/analytics';

export default function PreLanding() {
  useEffect(() => {
    const sendPrelandingView = () => {
      if (window.google_tag_manager) {
        trackPrelandingView();
      } else {
        setTimeout(sendPrelandingView, 200);
      }
    };
    setTimeout(sendPrelandingView, 500);
  }, []);

  const handleCTAClick = (location: string) => {
    trackPrelandingCTA(location);
  };

  return (
    <main className="min-h-screen bg-primary">

      {/* HERO — short, high-impact */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tertiary to-primary"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">

          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-bold tracking-widest uppercase border border-accent/20 rounded-sm">
              UCSF Research · In-House Synthesis
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 tracking-tight"
    style={{contentVisibility: 'auto'}}>
            You've Done Everything Right.
            <br />
            <span className="text-accent">Why Is Your Brain Still Failing You?</span>
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            You sleep 8 hours. You exercise. You've tried modafinil, racetams, every stack on
            r/Nootropics. And your thinking is still slower than it was two years ago.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            The problem isn't your habits. It's a cellular pathway — the Integrated Stress Response —
            that's been running in the background since your last burnout, blocking protein synthesis
            in your neurons. Rest doesn't fix it. Stimulants make it worse.
          </p>

          {/* 2 VOC quotes above the fold */}
          <div className="space-y-4 mb-10 text-left">
            <div className="quote-block">
              <p>"It wasn't the sharp, jittery buzz you get from caffeine or modafinil. It was cleaner. Just… clarity."</p>
            </div>
            <div className="quote-block">
              <p>"I've tried everything from noopept to Qualia — this was the first thing I could actually feel working."</p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/"
            onClick={() => handleCTAClick('hero_primary')}
            className="btn-primary inline-block mb-4 w-full md:w-auto"
          >
            See the Research & Order →
          </a>

          <p className="text-xs text-text-secondary tracking-wide">
            No medical claims · Research compound · Full COA included
          </p>

        </div>
      </section>

      {/* MECHANISM — brief, functional */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <div className="border-l-2 border-accent/40 pl-6 mb-8">
            <p className="text-text-secondary leading-relaxed mb-4">
              When the Integrated Stress Response (ISR) activates, protein synthesis in neurons decreases.
              Memory formation requires new proteins. No protein synthesis → no memory consolidation.
            </p>
            <p className="text-text-secondary leading-relaxed">
              <span className="text-text-primary font-semibold">ISRIB A15</span> binds to eIF2B —
              the master regulator of protein synthesis — and stabilizes it in its active form,
              overriding the ISR shutdown signal.
            </p>
          </div>

          <p className="text-accent font-semibold text-center text-lg mb-8">
            Not stimulation. Restoration at the cellular level.
          </p>

          {/* 3 quality markers */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: 'In-House Synthesis', sub: 'Not resold' },
              { label: 'LC-MS / NMR', sub: 'Every batch' },
              { label: '98%+ Purity', sub: 'HPLC confirmed' },
            ].map((item) => (
              <div key={item.label} className="card text-center">
                <p className="text-accent text-xs font-bold mb-1">{item.label}</p>
                <p className="text-text-secondary text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/"
              onClick={() => handleCTAClick('mechanism_cta')}
              className="btn-primary inline-block w-full md:w-auto"
            >
              See Full Research & Order →
            </a>
          </div>
        </div>
      </section>

      {/* DISQUALIFICATION */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-text-secondary uppercase tracking-widest text-center mb-6">This is not for you if:</p>
          <div className="space-y-2 mb-8">
            {[
              "You want an instant dopamine hit or quick energy boost",
              "You're not comfortable self-experimenting with research compounds",
              "You expect pharmaceutical approval or medical claims",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 card">
                <span className="text-danger flex-shrink-0 text-sm">✗</span>
                <p className="text-text-secondary text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent-muted border border-accent/20 p-4 rounded-sm text-center">
            <p className="text-xs text-text-secondary">
              <span className="text-accent font-semibold">Important:</span> ISRIB A15 is a research compound.
              Not FDA-approved. Intended for scientific investigation only.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-text-secondary">
            Research Compound · Not FDA-approved · Educational purposes only
          </p>
        </div>
      </footer>

    </main>
  );
}
