// POST /api/auth/login
// Authenticates user with email and password

import { z } from 'zod';
import prisma from '../../../lib/db';
import { comparePassword, generateToken, setAuthCookie } from '../../../lib/auth';
import { applyRateLimit } from '../../../lib/rate-limit';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default async function handler(req, res) {
  // 1. Rate Limiting (10 attempts per 5 minutes)
  if (!await applyRateLimit(req, res, {
    limit: 10,
    windowMs: 5 * 60 * 1000,
    keyPrefix: 'login'
  })) return;

  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate input
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = result.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // User not found - use generic message for security
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        error: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Verify password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    // Set cookie
    const cookie = setAuthCookie(token, process.env.NODE_ENV === 'production');
    res.setHeader('Set-Cookie', cookie);

    // Return success
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'An error occurred during login',
    });
  }
}
