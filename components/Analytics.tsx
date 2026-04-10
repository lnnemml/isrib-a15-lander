'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initDataLayer, initRedditPixel, initScrollTracking, trackPage } from '@/lib/analytics';

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize tracking on mount
  useEffect(() => {
    // Initialize dataLayer FIRST (before GTM script runs)
    initDataLayer();
    
    // Initialize Reddit Pixel (if you want direct tracking)
    // If you manage Reddit Pixel via GTM, you can comment this out
    initRedditPixel();
    
    // Initialize scroll depth tracking
    initScrollTracking();
    
    console.log('✅ Analytics initialized (GTM + Scroll tracking)');
  }, []);

  // Track page changes
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPage(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
