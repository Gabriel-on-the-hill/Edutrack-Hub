/**
 * NEXT.JS CONFIGURATION
 * 
 * SECURITY & PERFORMANCE IMPROVEMENTS:
 * ✅ Restricted image domains (security)
 * ✅ SWC minification (performance)
 * ✅ Cache optimization (performance)
 * ✅ Security headers
 * ✅ Powered-by header hidden (security)
 * 
 * EDIT INSTRUCTIONS:
 * - Update image domains to your actual domains
 * - Adjust ISR revalidation times based on your content update frequency
 * - Add your Sentry DSN for error tracking
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ========================================================================
  // REACT & OPTIMIZATION
  // ========================================================================
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // ========================================================================
  // IMAGE OPTIMIZATION - SECURITY: Restrict to trusted domains only
  // ========================================================================
  images: {
    // EDIT HERE: Replace with your actual image hosting domains
    // Remove remotePatterns and use specific domains for security
    domains: [
      'localhost',
      'edutrackhub.com',
      'www.edutrackhub.com',
      'cdn.edutrackhub.com',
      'images.unsplash.com', // Demo only - remove in production
      'images.pexels.com', // Demo only - remove in production
    ],

    // Image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for optimized images
  },

  // ========================================================================
  // HEADERS - SECURITY & CACHING
  // ========================================================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Don't cache API responses
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },

  // ========================================================================
  // REDIRECTS - EDIT AS NEEDED
  // ========================================================================
  async redirects() {
    return [
      // EDIT: Add your URL redirects here
      // Example: redirect old URLs to new ones
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true, // 301 redirect
      // },
    ];
  },

  // ========================================================================
  // ENVIRONMENT VARIABLES
  // ========================================================================
  env: {
    // EDIT HERE: Add public environment variables
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },

  // ========================================================================
  // SECURITY: Hide Next.js version
  // ========================================================================
  poweredByHeader: false,

  // ========================================================================
  // COMPRESSION
  // ========================================================================
  compress: true,

  // ========================================================================
  // TYPESCRIPT
  // ========================================================================
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // ========================================================================
  // ESLINT
  // ========================================================================
  eslint: {
    dirs: ['pages', 'components', 'lib'],
  },
};

module.exports = nextConfig;

