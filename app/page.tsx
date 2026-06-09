'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackLandingViewFromPrelanding, trackLandingView } from '@/lib/analytics';
import { initGA4ClientIdCache } from '@/utils/cross-domain-linker';
import EmailCapture from '@/components/EmailCapture';
import EmailCaptureInline from '@/components/EmailCaptureInline';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import WhoIsThisFor from '@/components/WhoIsThisFor';
import Evidence from '@/components/Evidence';
import MiniOffer from '@/components/MiniOffer';
import Experience from '@/components/Experience';
import Discovery from '@/components/Discovery';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';

function HomeContent() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isFromPrelanding =
      searchParams?.get('utm_campaign') === 'prelander' ||
      document.referrer.includes('/research');

    if (isFromPrelanding) {
      trackLandingViewFromPrelanding();
    } else {
      trackLandingView();
    }
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => {
      initGA4ClientIdCache();
    }, 1500);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero onOpenEmail={() => setShowEmailModal(true)} />
      <Problem />
      <WhoIsThisFor />
      <Evidence />
      <MiniOffer />
      <Experience />
      <EmailCaptureInline />
      <Discovery />
      <CTASection />
      <FAQ />

      <EmailCapture
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
