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
    <main className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center py-16">

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-bold tracking-widest uppercase border border-accent/20 rounded-sm">
            UCSF Research · 2013–2024
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6 tracking-tight text-text-primary">
          There's a cellular switch in your brain
          that determines whether you think clearly.
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-4">
          When it's stuck, more sleep,
          more caffeine, and more supplements
          often make no difference.
        </p>

        <p className="text-lg text-accent font-semibold mb-10">
          UCSF researchers found how to flip it back.
        </p>

        <a
          href="/"
          onClick={() => handleCTAClick('hero_primary')}
          className="btn-primary inline-block mb-4 w-full md:w-auto px-12 py-5 text-base"
        >
          See the Research →
        </a>

        <p className="text-xs text-text-secondary tracking-wide">
          No medical claims · Research compound · Full COA included
        </p>

      </div>
    </main>
  );
}
