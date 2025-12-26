// pages/api/admin/enrollments.js
// API endpoint for admin to view all enrollments

import prisma from '../../../lib/db';
import { requireRole } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // Require ADMIN role
  const user = requireRole(req, res, ['ADMIN']);
  if (!user) return;

  try {
    const { status, classId, limit = '20' } = req.query;

    const where = {};
    if (status) where.status = status;
    if (classId) where.classId = classId;

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        class: {
          select: {
            id: true,
            title: true,
            subject: true,
            scheduledTime: true,
            status: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
      take: parseInt(limit),
    });

    return res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Admin enrollments error:', error);
    return res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
}
