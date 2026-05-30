'use client';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

export default function GoogleTagManager() {
  return (
    <>
      {/* gtag stub — має бути до GTM */}
      <Script
        id="gtag-stub"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
          `,
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Microsoft Clarity */}
      <Script
        id="clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","wci589fgdr");
          `,
        }}
      />

      {/* Clarity UTM tags — читаємо з URL, не з ISRIBTracking */}
      <Script
        id="clarity-utm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  try {
    var params = new URLSearchParams(window.location.search);
    var creative = params.get('utm_content');
    var source = params.get('utm_source');
    var campaign = params.get('utm_campaign');
    if (typeof window.clarity === 'function') {
      if (creative)  window.clarity("set","creative", creative);
      if (source)    window.clarity("set","source", source);
      if (campaign)  window.clarity("set","campaign", campaign);
    }
  } catch(e) {}
})();
          `,
        }}
      />
    </>
  );
}
