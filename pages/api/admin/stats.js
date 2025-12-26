// pages/api/admin/stats.js
// API endpoint for admin statistics

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
    // Get total students
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' },
    });

    // Get total completed payments (revenue)
    const payments = await prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });

    // Get enrollments by status
    const enrollmentStats = await prisma.enrollment.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    // Get classes by status
    const classStats = await prisma.class.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    // Get recent signups (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSignups = await prisma.user.count({
      where: {
        role: 'STUDENT',
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    return res.status(200).json({
      totalStudents,
      totalRevenue: payments._sum.amount || 0,
      recentSignups,
      enrollmentStats: enrollmentStats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id;
        return acc;
      }, {}),
      classStats: classStats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id;
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
