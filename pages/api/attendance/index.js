// pages/api/attendance/index.js
// API endpoint for class attendance tracking

import prisma from '../../../lib/db';
import { requireAuth, requireRole } from '../../../lib/auth';
import { createAuditLog, AuditAction, AuditEntity } from '../../../lib/audit';

export default async function handler(req, res) {
  // POST - Record attendance (student joins class)
  if (req.method === 'POST') {
    const user = requireAuth(req, res);
    if (!user) return;

    const { classId, action } = req.body;

    if (!classId) {
      return res.status(400).json({ error: 'Class ID is required' });
    }

    try {
      // Verify class exists and user is enrolled
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_classId: {
            userId: user.id,
            classId,
          },
        },
        include: {
          class: true,
        },
      });

      if (!enrollment) {
        return res.status(403).json({ error: 'You are not enrolled in this class' });
      }

      if (enrollment.status !== 'CONFIRMED' && enrollment.status !== 'ATTENDED') {
        return res.status(403).json({ error: 'Your enrollment is not confirmed' });
      }

      // Handle join action
      if (action === 'join') {
        // Create or update attendance record
        const attendance = await prisma.attendance.upsert({
          where: {
            classId_userId: {
              classId,
              userId: user.id,
            },
          },
          update: {
            joinedAt: new Date(),
            wasPresent: true,
          },
          create: {
            classId,
            userId: user.id,
            joinedAt: new Date(),
            wasPresent: true,
          },
        });

        // Update enrollment status to ATTENDED
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { status: 'ATTENDED' },
        });

        // Log the attendance
        await createAuditLog({
          actorId: user.id,
          action: AuditAction.ATTEND,
          entity: AuditEntity.CLASS,
          entityId: classId,
          metadata: { joinedAt: new Date().toISOString() },
        });

        return res.status(200).json({
          message: 'Attendance recorded',
          attendance,
          meetUrl: enrollment.class.meetUrl,
        });
      }

      // Handle leave action
      if (action === 'leave') {
        const attendance = await prisma.attendance.findUnique({
          where: {
            classId_userId: {
              classId,
              userId: user.id,
            },
          },
        });

        if (!attendance) {
          return res.status(400).json({ error: 'No attendance record found' });
        }

        // Calculate duration
        const duration = Math.round(
          (new Date() - new Date(attendance.joinedAt)) / 60000
        );

        // Update attendance with leave time and duration
        const updated = await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            leftAt: new Date(),
            duration,
          },
        });

        // Update progress
        await updateProgress(user.id, enrollment.class.subject, duration);

        return res.status(200).json({
          message: 'Left class',
          attendance: updated,
          duration,
        });
      }

      return res.status(400).json({ error: 'Invalid action. Use "join" or "leave"' });
    } catch (error) {
      console.error('Attendance error:', error);
      return res.status(500).json({ error: 'Failed to record attendance' });
    }
  }

  // GET - Get attendance for a class (admin) or user's attendance history
  if (req.method === 'GET') {
    const user = requireAuth(req, res);
    if (!user) return;

    const { classId } = req.query;

    try {
      // If classId provided and user is admin, get class attendance
      if (classId && user.role === 'ADMIN') {
        const attendance = await prisma.attendance.findMany({
          where: { classId },
          include: {
            class: {
              select: {
                title: true,
                scheduledTime: true,
              },
            },
          },
        });

        // Get user info separately (since userId is not a relation)
        const userIds = attendance.map(a => a.userId);
        const users = await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true },
        });

        const userMap = users.reduce((acc, u) => {
          acc[u.id] = u;
          return acc;
        }, {});

        const enrichedAttendance = attendance.map(a => ({
          ...a,
          user: userMap[a.userId] || null,
        }));

        return res.status(200).json({ attendance: enrichedAttendance });
      }

      // Otherwise, get user's own attendance history
      const attendance = await prisma.attendance.findMany({
        where: { userId: user.id },
        include: {
          class: {
            select: {
              id: true,
              title: true,
              subject: true,
              scheduledTime: true,
              duration: true,
            },
          },
        },
        orderBy: { joinedAt: 'desc' },
        take: 20,
      });

      return res.status(200).json({ attendance });
    } catch (error) {
      console.error('Attendance fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}

// Helper function to update progress
async function updateProgress(userId, subject, minutes) {
  try {
    await prisma.progress.upsert({
      where: {
        userId_subject: {
          userId,
          subject,
        },
      },
      update: {
        classesAttended: { increment: 1 },
        totalMinutes: { increment: minutes },
        lastClassDate: new Date(),
        streak: { increment: 1 },
      },
      create: {
        userId,
        subject,
        classesEnrolled: 1,
        classesAttended: 1,
        totalMinutes: minutes,
        currentLevel: 'BEGINNER',
        lastClassDate: new Date(),
        streak: 1,
      },
    });
  } catch (error) {
    console.error('Progress update failed:', error);
  }
}
