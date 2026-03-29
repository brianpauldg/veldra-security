/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── SECURITY ─────────────────────────────────────────────────────────────
  
  // Disable x-powered-by header (don't expose Next.js version)
  poweredByHeader: false,
  
  // Strict mode catches potential issues early
  reactStrictMode: true,
  
  // Security headers (backup to middleware)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      // Extra headers for API routes
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ]
  },

  // ── REDIRECTS ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Force www-less URLs
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.app.veldra.io' }],
        destination: 'https://app.veldra.io/:path*',
        permanent: true,
      },
    ]
  },

  // ── IMAGE SECURITY ────────────────────────────────────────────────────────
  images: {
    domains: ['lh3.googleusercontent.com'], // Google OAuth avatars only
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
  },

  // ── ENV VARS (only expose what's needed client-side) ──────────────────────
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Never expose these to the client bundle:
  // SUPABASE_SERVICE_ROLE_KEY - server only
  // ENCRYPTION_KEY - server only
  // STRIPE_SECRET_KEY - server only
}

module.exports = nextConfig
