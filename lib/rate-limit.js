/**
 * Simple In-Memory Rate Limiting
 * 
 * NOTE: In-memory storage means limits reset on server restart
 * and are not shared across multiple server instances (e.g., Vercel serverless).
 * For production, consider using Redis (Upstash) for shared state.
 */

const trackers = new Map();

/**
 * Check if the request should be rate limited
 * 
 * @param {string} key - Unique key for the tracker (e.g., IP address or user ID)
 * @param {number} limit - Maximum allowed requests in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} { allowed: boolean, remaining: number, reset: number }
 */
export function rateLimit(key, limit = 5, windowMs = 60 * 1000) {
    const now = Date.now();
    const record = trackers.get(key) || { count: 0, reset: now + windowMs };

    // Reset if window expired
    if (now > record.reset) {
        record.count = 0;
        record.reset = now + windowMs;
    }

    record.count++;
    trackers.set(key, record);

    return {
        allowed: record.count <= limit,
        remaining: Math.max(0, limit - record.count),
        reset: record.reset,
    };
}

/**
 * Middleware wrapper for Next.js API routes
 */
export async function applyRateLimit(req, res, options = {}) {
    const {
        limit = 5,
        windowMs = 60 * 1000,
        keyPrefix = 'rl'
    } = options;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = `${keyPrefix}:${ip}`;

    const { allowed, remaining, reset } = rateLimit(key, limit, windowMs);

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!allowed) {
        res.status(429).json({
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((reset - Date.now()) / 1000),
        });
        return false;
    }

    return true;
}
