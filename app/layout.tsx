import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Analytics from '@/components/Analytics';
import GoogleTagManager from '@/components/GoogleTagManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ISRIB A15 - Release Your Brain\'s Hidden Potential',
  description: 'The science-backed compound that reverses cognitive decline by targeting the root cause: your brain\'s stress response.',
  keywords: 'ISRIB, cognitive enhancement, nootropics, memory, focus, brain fog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GTM will inject its scripts here via Next.js Script component */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - loads first */}
        <GoogleTagManager />
        
        {/* Your existing analytics (GA4 + Reddit Pixel) */}
        <Analytics />
        
        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
