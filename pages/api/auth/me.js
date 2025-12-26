// GET /api/auth/me
// Returns the currently authenticated user

import prisma from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Require authentication
  const auth = requireAuth(req, res);
  if (!auth) return; // Response already sent by requireAuth

  try {
    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: auth.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        // Include enrollment count
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account deactivated',
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        enrollmentCount: user._count.enrollments,
      },
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      error: 'Failed to get user data',
    });
  }
}
