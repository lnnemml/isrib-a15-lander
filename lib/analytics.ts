// lib/analytics.ts
// Complete GTM tracking for Reddit Ads -> Prelanding -> Landing -> Purchase funnel

// Type declarations
declare global {
  interface Window {
    dataLayer: any[];
    rdt?: any;
  }
}

// ============================================
// CONFIGURATION
// ============================================

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
export const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID || 'REDDIT_PIXEL_XXXXXXX';

// Debug mode
const DEBUG = process.env.NODE_ENV === 'development';

const log = (...args: any[]) => {
  if (DEBUG) console.log('📊 Analytics:', ...args);
};

// ============================================
// CORE FUNCTIONS
// ============================================

// Initialize dataLayer before GTM loads
export const initDataLayer = (): void => {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  log('✅ DataLayer initialized');
};

// Initialize Reddit Pixel
export const initRedditPixel = (): void => {
  if (typeof window === 'undefined') return;
  
  if (!window.rdt) {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
      rdt('init','${REDDIT_PIXEL_ID}', {"optOut":false,"useDecimalCurrencyValues":true});
      rdt('track', 'PageVisit');
    `;
    document.head.appendChild(script);
    log('✅ Reddit Pixel initialized');
  }
};

// Push events to GTM dataLayer
export const pushToDataLayer = (event: any): void => {
  if (typeof window === 'undefined') return;
  
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  
  window.dataLayer.push(event);
  log('Event pushed to GTM:', event);
};

// Push events to Reddit Pixel
export const pushToReddit = (eventName: string, customData?: any): void => {
  if (typeof window === 'undefined') return;
  
  if (window.rdt) {
    window.rdt('track', eventName, customData);
    log('Event pushed to Reddit:', eventName, customData);
  }
};

// ============================================
// PAGE TRACKING
// ============================================

// Track page view
export const trackPage = (url: string): void => {
  const isPrelandingPage = url.includes('/research');
  const isLandingPage = !isPrelandingPage && url === '/';
  
  pushToDataLayer({
    event: 'page_view',
    page_url: url,
    page_type: isPrelandingPage ? 'prelanding' : isLandingPage ? 'landing' : 'other',
  });
  
  log('Page view:', url);
};

// ============================================
// FUNNEL TRACKING
// ============================================

// 1. Track prelanding view (from Reddit Ads)
export const trackPrelandingView = (): void => {
  // GTM Event
  pushToDataLayer({
    event: 'prelanding_view',
    page_type: 'prelanding',
    funnel_step: 1,
  });
  
  // Reddit Pixel
  pushToReddit('ViewContent', {
    page_type: 'prelanding'
  });
  
  log('Prelanding view tracked');
};

// 2. Track prelanding CTA click
export const trackPrelandingCTA = (location: string): void => {
  // GTM Event
  pushToDataLayer({
    event: 'prelanding_cta_click',
    cta_location: location,
    funnel_step: 2,
  });
  
  // Reddit Pixel
  pushToReddit('Custom', {
    event_name: 'PrelandingCTAClick',
    cta_location: location
  });
  
  log('Prelanding CTA click:', location);
};

// 3. Track landing view from prelanding
export const trackLandingViewFromPrelanding = (): void => {
  // GTM Event
  pushToDataLayer({
    event: 'landing_view_from_prelanding',
    page_type: 'landing',
    source: 'prelanding',
    funnel_step: 3,
  });
  
  // Reddit Pixel
  pushToReddit('ViewContent', {
    page_type: 'landing',
    source: 'prelanding'
  });
  
  log('Landing view from prelanding tracked');
};

// 3b. Track direct landing view (not from prelanding)
export const trackLandingView = (): void => {
  // GTM Event
  pushToDataLayer({
    event: 'landing_view',
    page_type: 'landing',
    source: 'direct',
    funnel_step: 1,
  });
  
  // Reddit Pixel
  pushToReddit('ViewContent', {
    page_type: 'landing',
    source: 'direct'
  });
  
  log('Direct landing view tracked');
};

// ============================================
// CONVERSION TRACKING
// ============================================

// Track email capture
export const trackEmailCapture = (source: string): void => {
  // GTM Event
  pushToDataLayer({
    event: 'email_capture',
    capture_source: source,
    funnel_step: 4,
  });
  
  // Reddit Pixel - Lead event
  pushToReddit('Lead', {
    capture_source: source
  });
  
  log('Email capture:', source);
};

// Track buy button click (before leaving to checkout)
export const trackBuyClick = (
  product: '500mg' | '1g' | '25-capsules' | '50-capsules', 
  price: number, 
  location: string,
  format: 'powder' | 'capsules' = 'powder'
): void => {
  // GTM Event
  pushToDataLayer({
    event: 'buy_click',
    product_sku: product,
    product_price: price,
    product_format: format,
    button_location: location,
    destination_url: `https://isrib.shop/buy-${product}.html`,
    funnel_step: 5,
  });
  
  // Reddit Pixel - AddToCart event
  pushToReddit('AddToCart', {
    itemCount: 1,
    products: [{
      id: `ISRIB-A15-${product}`,
      name: `ISRIB A15 ${product}`,
      category: 'Research Compounds',
      format: format,
    }],
    value: price,
    currency: 'USD',
  });
  
  log('Buy click tracked:', { product, price, location, format });
};

// Track product view (when user sees pricing section)
export const trackProductView = (productName: string, price: number, format?: 'powder' | 'capsules'): void => {
  pushToDataLayer({
    event: 'product_view',
    product_name: productName,
    product_price: price,
    product_format: format || 'powder',
  });
  
  log('Product view:', productName, format);
};

// Track product format switch (powder ⇄ capsules)
export const trackFormatSwitch = (fromFormat: 'powder' | 'capsules', toFormat: 'powder' | 'capsules'): void => {
  pushToDataLayer({
    event: 'product_format_switch',
    from_format: fromFormat,
    to_format: toFormat,
    timestamp: new Date().toISOString(),
  });
  
  // Reddit Pixel - Custom event
  pushToReddit('Custom', {
    event_name: 'FormatSwitch',
    from_format: fromFormat,
    to_format: toFormat
  });
  
  log('Format switch:', fromFormat, '→', toFormat);
};

// Track general button clicks
export const trackButtonClick = (buttonName: string, location: string): void => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    button_location: location,
  });
  
  log('Button click:', buttonName, location);
};

// ============================================
// SCROLL DEPTH TRACKING
// ============================================

let scrollDepthTracked = {
  '25': false,
  '50': false,
  '75': false,
  '90': false,
  '100': false
};

// Track scroll depth percentage
export const trackScrollDepth = (percentage: number): void => {
  const percentStr = percentage.toString() as keyof typeof scrollDepthTracked;
  
  // Only track each milestone once per page
  if (scrollDepthTracked[percentStr]) {
    return;
  }
  
  scrollDepthTracked[percentStr] = true;
  
  const isLandingPage = !window.location.pathname.includes('/research');
  
  // GTM Event - основний scroll_depth event
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: percentage,
    page_type: window.location.pathname.includes('/research') ? 'prelanding' : 'landing',
  });
  
  // Додатковий GTM Event - landing_scroll (тільки для landing page)
  if (isLandingPage) {
    pushToDataLayer({
      event: 'landing_scroll',
      scroll_percentage: percentage,
      scroll_milestone: `${percentage}%`,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }
  
  log('Scroll depth:', percentage + '%', isLandingPage ? '(landing_scroll event sent)' : '');
};

// Initialize scroll tracking
export const initScrollTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  let ticking = false;
  
  const checkScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );
    
    // Track milestones
    if (scrollPercentage >= 25 && !scrollDepthTracked['25']) {
      trackScrollDepth(25);
    }
    if (scrollPercentage >= 50 && !scrollDepthTracked['50']) {
      trackScrollDepth(50);
    }
    if (scrollPercentage >= 75 && !scrollDepthTracked['75']) {
      trackScrollDepth(75);
    }
    if (scrollPercentage >= 90 && !scrollDepthTracked['90']) {
      trackScrollDepth(90);
    }
    if (scrollPercentage >= 99 && !scrollDepthTracked['100']) {
      trackScrollDepth(100);
    }
    
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(checkScrollDepth);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Reset tracking when page changes
  const resetScrollTracking = () => {
    scrollDepthTracked = {
      '25': false,
      '50': false,
      '75': false,
      '90': false,
      '100': false
    };
  };
  
  // Listen for page changes (for SPA navigation)
  window.addEventListener('popstate', resetScrollTracking);
  
  log('✅ Scroll tracking initialized');
};

// ============================================
// PURCHASE TRACKING (if you add checkout on your site later)
// ============================================

// Track completed purchase
export const trackPurchase = (
  orderId: string,
  product: string,
  price: number
): void => {
  // GTM Event
  pushToDataLayer({
    event: 'purchase',
    transaction_id: orderId,
    value: price,
    currency: 'USD',
    items: [{
      item_id: `ISRIB-A15-${product}`,
      item_name: `ISRIB A15 ${product}`,
      price: price,
      quantity: 1,
    }],
    funnel_step: 6,
  });
  
  // Reddit Pixel - Purchase event
  pushToReddit('Purchase', {
    transactionId: orderId,
    value: price,
    currency: 'USD',
    products: [{
      id: `ISRIB-A15-${product}`,
      name: `ISRIB A15 ${product}`,
      category: 'Research Compounds',
    }],
  });
  
  log('Purchase tracked:', { orderId, product, price });
};
