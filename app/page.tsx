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
import Discovery from '@/components/Discovery';
import Evidence from '@/components/Evidence';
import PurityGuarantee from '@/components/PurityGuarantee';
import Experience from '@/components/Experience';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';

function HomeContent() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const searchParams = useSearchParams();

  // Track landing view with source detection
  useEffect(() => {
    // Перевіряємо чи користувач прийшов з prelanding
    const isFromPrelanding =
      searchParams?.get('utm_campaign') === 'prelander' ||
      document.referrer.includes('/research');

    if (isFromPrelanding) {
      // Якщо з prelanding - використовуємо старий event
      trackLandingViewFromPrelanding();
    } else {
      // Якщо прямий заход (з Reddit Ads, Google, Direct) - новий event
      trackLandingView();
    }
  }, [searchParams]);

  // Initialize GA4 Client ID cache
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
      <Discovery />
      <Evidence />
      <PurityGuarantee />
      <Experience />
      <CTASection />
      <EmailCaptureInline />
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
