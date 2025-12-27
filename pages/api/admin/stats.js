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

    // Get raw data for charts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const rawPayments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: sixMonthsAgo }
      },
      select: { amount: true, createdAt: true }
    });

    const rawStudents = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        createdAt: { gte: sixMonthsAgo }
      },
      select: { createdAt: true }
    });

    // Helper to format month
    const getMonthKey = (date) => date.toISOString().slice(0, 7); // YYYY-MM

    // Aggregate Revenue
    const revenueMap = {};
    rawPayments.forEach(p => {
      const key = getMonthKey(p.createdAt);
      revenueMap[key] = (revenueMap[key] || 0) + p.amount;
    });

    // Aggregate Students
    const studentsMap = {};
    rawStudents.forEach(s => {
      const key = getMonthKey(s.createdAt);
      studentsMap[key] = (studentsMap[key] || 0) + 1;
    });

    // Fill last 6 months buckets
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = getMonthKey(d);
      const label = d.toLocaleDateString('en-US', { month: 'short' });

      chartData.push({
        name: label,
        revenue: (revenueMap[key] || 0) / 100, // Convert to main unit
        students: studentsMap[key] || 0
      });
    }

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
      chartData // New field
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
