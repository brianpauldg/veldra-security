import './globals.css'
import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PublicChromeFrame, PublicChromeIslands } from '@/components/LayoutShell'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bloom Metabolics | TRT, GLP-1 & Longevity Care',
    template: '%s | Bloom Metabolics',
  },
  description:
    'Personalized TRT, GLP-1, peptide, and longevity care designed to optimize hormones, metabolism, and performance.',
  keywords:
    'TRT telehealth, testosterone replacement, online TRT clinic, GLP-1 weight loss, semaglutide, tirzepatide, telehealth, hormone optimization, metabolic health membership, longevity',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bloom Metabolics | TRT, GLP-1 & Longevity Care',
    description:
      'Personalized TRT, GLP-1, peptide, and longevity care designed to optimize hormones, metabolism, and performance.',
    type: 'website',
    siteName: 'Bloom Metabolics',
    url: SITE_URL,
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bloom Metabolics' }],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloom Metabolics | TRT, GLP-1 & Longevity Care',
    description:
      'Personalized TRT, GLP-1, peptide, and longevity care designed to optimize hormones, metabolism, and performance.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#020202',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to font CDNs and preload key fonts to cut LCP. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Header + Footer are server components — zero client JS for chrome.
            The PublicChromeFrame client wrapper just decides whether to render
            them (hidden on /clinic) without dragging Header/Footer into the bundle. */}
        <PublicChromeFrame header={<Header />} footer={<Footer />}>
          {children}
        </PublicChromeFrame>
        {/* Below-the-fold + deferred islands (popups, cookie banner, attribution). */}
        <PublicChromeIslands />

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
