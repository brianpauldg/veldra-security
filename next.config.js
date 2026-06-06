/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  // Mobile performance: gzip/brotli + aggressive image optimization.
  compress: true,

  // Treat lucide-react as transpileModules to enable tree-shaking
  // (icons become ~1KB each instead of bundling the whole library).
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async redirects() {
    return [
      { source: '/vs/hims', destination: '/', permanent: true },
      { source: '/vs/roman', destination: '/', permanent: true },
      // Vanity SEO redirects (catch common search-intent URLs)
      { source: '/trt-clinic-orange-county', destination: '/orange-county/trt', permanent: true },
      { source: '/glp1-clinic-orange-county', destination: '/orange-county/glp1', permanent: true },
      { source: '/trt-irvine', destination: '/irvine/trt', permanent: true },
      { source: '/glp1-irvine', destination: '/irvine/glp1', permanent: true },
      { source: '/medical-weight-loss-orange-county', destination: '/orange-county/medical-weight-loss', permanent: true },
      { source: '/hormone-optimization-near-me', destination: '/orange-county/hormone-optimization', permanent: true },
      { source: '/peptide-therapy-orange-county', destination: '/orange-county/peptide-therapy', permanent: true },
    ]
  },

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
        ],
      },
      // Long-cache static assets (matches Vercel default but explicit for any host).
      {
        source: '/(.*).(png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache HTML for short windows so static pages still feel instant.
      {
        source: '/((?!api).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    domains: [],
    dangerouslyAllowSVG: false,
  },

  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  },
}

module.exports = nextConfig
