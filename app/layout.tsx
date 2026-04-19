import './globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { LayoutShell } from '@/components/LayoutShell'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

export const metadata: Metadata = {
  title: {
    default: 'Bloom Metabolics — Testosterone, GLP-1, and Peptide Therapy from Licensed Physicians',
    template: '%s | Bloom Metabolics',
  },
  description: 'Premium physician-managed telehealth for TRT, GLP-1 weight loss, and peptide therapy. Comprehensive labs. Transparent pricing. Proactive care.',
  keywords: 'TRT telehealth, testosterone replacement, online TRT clinic, GLP-1 weight loss, semaglutide, tirzepatide, peptide therapy, telehealth, hormone optimization',
  openGraph: {
    title: 'Bloom Metabolics — Your Metabolism, Optimized',
    description: 'TRT, GLP-1, and peptide therapy. Licensed physicians. Comprehensive labs. Transparent pricing.',
    type: 'website',
    siteName: 'Bloom Metabolics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloom Metabolics — Premium Metabolic Health Telehealth',
    description: 'TRT, GLP-1, and peptide therapy. Licensed providers. Comprehensive labs. Book a consultation today.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>

        {/* ── Meta Pixel (env-gated) ───────────────────────── */}
        {META_PIXEL_ID ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}

        {/* ── GA4 (env-gated) ──────────────────────────────── */}
        {GA4_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
