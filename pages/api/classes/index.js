// GET /api/classes - List all upcoming classes
// POST /api/classes - Create a new class (admin only)

import prisma from '../../../lib/db';
import { requireAuth, requireRole } from '../../../lib/auth';
import { createMeeting } from '../../../lib/google';
import { createAuditLog, AuditAction, AuditEntity } from '../../../lib/audit';
import { z } from 'zod';

// Validation schema for creating a class
const createClassSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
  scheduledTime: z.string().datetime('Invalid date format'),
  duration: z.number().min(15).max(240).default(60),
  maxStudents: z.number().min(1).max(100).default(10),
  price: z.number().min(0).default(0),
  currency: z.string().default('NGN'),
  topics: z.array(z.string()).optional(),
  meetUrl: z.string().url().optional(),
  notesUrl: z.string().url().optional(),
  recordingUrl: z.string().url().optional(),
});

export default async function handler(req, res) {
  // GET - List classes (public)
  if (req.method === 'GET') {
    try {
      const { subject, level, upcoming } = req.query;

      const where = {
        status: { in: ['SCHEDULED', 'LIVE'] },
      };

      // Filter by subject
      if (subject) {
        where.subject = subject;
      }

      // Filter by level
      if (level) {
        where.level = level;
      }

      // Filter upcoming only
      if (upcoming === 'true') {
        where.scheduledTime = { gte: new Date() };
      }

      const classes = await prisma.class.findMany({
        where,
        orderBy: { scheduledTime: 'asc' },
        select: {
          id: true,
          title: true,
          description: true,
          subject: true,
          level: true,
          scheduledTime: true,
          duration: true,
          maxStudents: true,
          price: true,
          currency: true,
          currency: true,
          status: true,
          topics: true,
          meetUrl: true,
          notesUrl: true,
          recordingUrl: true,
          _count: {
            select: { enrollments: true },
          },
        },
      });

      // Transform data
      const transformed = classes.map((c) => ({
        ...c,
        topics: c.topics ? JSON.parse(c.topics) : [],
        enrolledCount: c._count.enrollments,
        spotsLeft: c.maxStudents - c._count.enrollments,
        isFull: c._count.enrollments >= c.maxStudents,
      }));

      return res.status(200).json({
        classes: transformed,
        total: transformed.length,
      });

    } catch (error) {
      console.error('Get classes error:', error);
      return res.status(500).json({ error: 'Failed to fetch classes' });
    }
  }

  // POST - Create class (admin only)
  if (req.method === 'POST') {
    const auth = requireRole(req, res, ['ADMIN']);
    if (!auth) return;

    try {
      const result = createClassSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const data = result.data;

      // Auto-generate Google Meet link (Phase 2 Automation)
      let generatedMeetUrl = null;
      if (!data.meetUrl) {
        generatedMeetUrl = await createMeeting({
          title: data.title,
          description: data.description || `Class: ${data.subject}`,
          startTime: new Date(data.scheduledTime),
          durationMinutes: data.duration,
        });
      }

      const newClass = await prisma.class.create({
        data: {
          title: data.title,
          description: data.description,
          subject: data.subject,
          level: data.level,
          scheduledTime: new Date(data.scheduledTime),
          duration: data.duration,
          maxStudents: data.maxStudents,
          price: data.price,
          currency: data.currency,
          topics: data.topics ? JSON.stringify(data.topics) : null,
          topics: data.topics ? JSON.stringify(data.topics) : null,
          meetUrl: data.meetUrl || generatedMeetUrl,
          notesUrl: data.notesUrl,
          recordingUrl: data.recordingUrl,
          status: 'SCHEDULED',
        },
      });

      // Audit log: Class created
      await createAuditLog({
        actorId: auth.user.userId,
        action: AuditAction.CREATE,
        entity: AuditEntity.CLASS,
        entityId: newClass.id,
        changes: { title: newClass.title, subject: newClass.subject },
        metadata: { price: newClass.price, scheduledTime: newClass.scheduledTime },
      });

      return res.status(201).json({
        message: 'Class created successfully',
        class: {
          ...newClass,
          topics: newClass.topics ? JSON.parse(newClass.topics) : [],
        },
      });

    } catch (error) {
      console.error('Create class error:', error);
      return res.status(500).json({ error: 'Failed to create class' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
