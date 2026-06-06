import './globals.css'
import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PublicChromeFrame, PublicChromeIslands } from '@/components/LayoutShell'

// ── Self-hosted fonts (next/font) ─────────────────────────────────────────────
// Eliminates the render-blocking <link rel="stylesheet"> to Google Fonts
// (PSI flagged this as 2,000ms of render-blocking time on mobile). next/font
// inlines the @font-face declarations, self-hosts the woff2 files, and emits
// CSS variables we re-export via globals.css. Lora was loaded but never used —
// removed entirely (~25% of the original font payload).

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
})

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
    <html
      lang="en"
      className={`scroll-smooth ${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
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
