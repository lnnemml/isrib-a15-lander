// utils/cross-domain-linker.ts
// Appends GA4 Client ID and Meta cookies to all checkout links
// Use on isrib-research.com (Next.js landing page)


/**
 * Get GA4 Client ID from gtag
 */
function getGA4ClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (typeof window === 'undefined' || !window.gtag || !gaId) {
      resolve(null);
      return;
    }

    // Try to get client_id from gtag
    window.gtag('get', gaId, 'client_id', (clientId: string) => {
      if (clientId) {
        console.log('✅ GA4 Client ID:', clientId);
        resolve(clientId);
      } else {
        // Fallback: try to get from _ga cookie
        const gaCookie = getCookie('_ga');
        if (gaCookie) {
          // _ga cookie format: GA1.2.XXXXXXXXXX.YYYYYYYYYY
          // Client ID is: XXXXXXXXXX.YYYYYYYYYY
          const parts = gaCookie.split('.');
          if (parts.length >= 4) {
            const clientId = `${parts[2]}.${parts[3]}`;
            console.log('✅ GA4 Client ID (from cookie):', clientId);
            resolve(clientId);
            return;
          }
        }
        resolve(null);
      }
    });
  });
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Get Meta FBP cookie
 */
function getMetaFBP(): string | null {
  return getCookie('_fbp');
}

/**
 * Get Meta FBC cookie (from Facebook ad click)
 */
function getMetaFBC(): string | null {
  return getCookie('_fbc');
}

/**
 * Append tracking parameters to URL
 */
export async function appendTrackingParams(url: string): Promise<string> {
  if (typeof window === 'undefined') return url;
  
  const urlObj = new URL(url, window.location.origin);
  
  // Get tracking IDs
  const gacid = await getGA4ClientId();
  const fbp = getMetaFBP();
  const fbc = getMetaFBC();
  
  // Append parameters
  if (gacid) {
    urlObj.searchParams.set('gacid', gacid);
  }
  
  if (fbp) {
    urlObj.searchParams.set('fbp', fbp);
  }
  
  if (fbc) {
    urlObj.searchParams.set('fbc', fbc);
  }
  
  // Preserve existing UTM parameters
  const currentParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  utmParams.forEach(param => {
    const value = currentParams.get(param);
    if (value && !urlObj.searchParams.has(param)) {
      urlObj.searchParams.set(param, value);
    }
  });
  
  const finalUrl = urlObj.toString();
  console.log('🔗 Enhanced URL:', finalUrl);
  
  return finalUrl;
}

/**
 * Initialize cross-domain tracking on all checkout links
 * Call this in your Next.js page component
 */
export function initCrossDomainTracking() {
  if (typeof window === 'undefined') return;
  
  console.log('🔗 Initializing cross-domain tracking...');
  
  // Target domains for tracking
  const targetDomains = ['isrib.shop'];
  
  // Find all links to checkout domain
  const updateLinks = async () => {
    const links = document.querySelectorAll('a[href]');
    
    for (const link of Array.from(links)) {
      const href = link.getAttribute('href');
      if (!href) continue;
      
      // Check if link points to checkout domain
      const isTargetDomain = targetDomains.some(domain => 
        href.includes(domain)
      );
      
      if (isTargetDomain) {
        // Mark as processed to avoid duplicate processing
        if (link.hasAttribute('data-tracking-enhanced')) {
          continue;
        }
        
        link.setAttribute('data-tracking-enhanced', 'true');
        
        // Add click handler to append tracking params
        link.addEventListener('click', async (e) => {
          e.preventDefault();
          
          const enhancedUrl = await appendTrackingParams(href);
          
          console.log('🚀 Navigating with tracking:', enhancedUrl);
          
          // Navigate to enhanced URL
          window.location.href = enhancedUrl;
        });
        
        console.log('✅ Enhanced link:', href);
      }
    }
  };
  
  // Update links on load
  updateLinks();
  
  // Update links when DOM changes (for dynamic content)
  const observer = new MutationObserver(updateLinks);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  
  console.log('✅ Cross-domain tracking initialized');
}

// For non-React usage, export standalone function
export default initCrossDomainTracking;
