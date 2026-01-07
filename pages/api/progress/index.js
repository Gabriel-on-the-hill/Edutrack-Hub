// pages/api/progress/index.js
// API endpoint for student progress tracking

import prisma from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  // GET - Fetch user's progress across all subjects
  if (req.method === 'GET') {
    const auth = requireAuth(req, res);
    if (!auth) return;

    const userId = auth.user.userId;

    try {
      // Get progress records for this user
      const progress = await prisma.progress.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      });

      // Get overall stats
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          class: {
            select: {
              subject: true,
              duration: true,
              status: true,
            },
          },
        },
      });

      // Calculate overall statistics
      const totalEnrolled = enrollments.length;
      const totalAttended = enrollments.filter(
        (e) => e.status === 'ATTENDED' || e.status === 'COMPLETED'
      ).length;
      const totalCompleted = enrollments.filter(
        (e) => e.status === 'COMPLETED'
      ).length;
      const totalMinutes = progress.reduce((sum, p) => sum + p.totalMinutes, 0);

      // Get unique subjects
      const subjects = [...new Set(enrollments.map((e) => e.class.subject))];

      // Calculate attendance rate
      const attendanceRate = totalEnrolled > 0
        ? Math.round((totalAttended / totalEnrolled) * 100)
        : 0;

      // Get current streak (consecutive completed classes)
      const maxStreak = progress.reduce((max, p) => Math.max(max, p.streak), 0);

      return res.status(200).json({
        progress,
        stats: {
          totalEnrolled,
          totalAttended,
          totalCompleted,
          totalMinutes,
          totalHours: Math.round(totalMinutes / 60 * 10) / 10,
          attendanceRate,
          currentStreak: maxStreak,
          subjectsStudied: subjects.length,
          subjects,
        },
      });
    } catch (error) {
      console.error('Progress fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch progress' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
