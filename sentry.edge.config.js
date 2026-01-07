// sentry.edge.config.js
// Sentry configuration for edge runtime (middleware)
// This initializes Sentry for edge functions

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    // Your Sentry DSN - get this from https://sentry.io
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Environment
    environment: process.env.NODE_ENV,

    // Adjust this value in production
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Only send errors in production (unless DSN is set in dev for testing)
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
});
