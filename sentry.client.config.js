// sentry.client.config.js
// Sentry configuration for the browser (client-side)
// This initializes Sentry in the browser to capture client-side errors

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // Your Sentry DSN - get this from https://sentry.io
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Only send errors in production (unless DSN is set in dev for testing)
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Capture replays for errors
  replaysOnErrorSampleRate: 1.0,

  // Capture sessions for replays at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      // Mask all text content for privacy
      maskAllText: true,
      // Block all media for performance
      blockAllMedia: true,
    }),
  ],
});
