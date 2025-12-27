// GET /api/classes/[id] - Get single class details
// PUT /api/classes/[id] - Update class (admin only)
// DELETE /api/classes/[id] - Delete class (admin only)

import prisma from '../../../lib/db';
import { requireRole, getCurrentUser } from '../../../lib/auth';
import { z } from 'zod';

// Validation schema for updating a class
const updateClassSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().optional(),
  subject: z.string().min(2).optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  scheduledTime: z.string().datetime().optional(),
  duration: z.number().min(15).max(240).optional(),
  maxStudents: z.number().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  topics: z.array(z.string()).optional(),
  meetUrl: z.string().url().optional().nullable(),
  status: z.enum(['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Class ID is required' });
  }

  // GET - Get class details (public)
  if (req.method === 'GET') {
    try {
      const classData = await prisma.class.findUnique({
        where: { id },
        include: {
          enrollments: {
            select: {
              id: true,
              status: true,
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: { enrollments: true },
          },
        },
      });

      if (!classData) {
        return res.status(404).json({ error: 'Class not found' });
      }

      // Check if user is authorized to see sensitive details (admin or enrolled student)
      const user = getCurrentUser(req);
      const isAdmin = user?.role === 'ADMIN';
      const isEnrolled = classData.enrollments.some(e => e.user.id === user?.uid && e.status === 'CONFIRMED');
      const canSeeSensitive = isAdmin || isEnrolled;

      return res.status(200).json({
        class: {
          ...classData,
          // ✅ V-01: Prevent unauthorized access to session links
          meetUrl: canSeeSensitive ? classData.meetUrl : null,
          notesUrl: canSeeSensitive ? classData.notesUrl : null,
          recordingUrl: canSeeSensitive ? classData.recordingUrl : null,

          // ✅ V-02: Prevent PII leak (student names)
          enrollments: isAdmin ? classData.enrollments : [],

          topics: classData.topics ? JSON.parse(classData.topics) : [],
          enrolledCount: classData._count.enrollments,
          spotsLeft: classData.maxStudents - classData._count.enrollments,
          isFull: classData._count.enrollments >= classData.maxStudents,
        },
      });

    } catch (error) {
      console.error('Get class error:', error);
      return res.status(500).json({ error: 'Failed to fetch class' });
    }
  }

  // PUT - Update class (admin only)
  if (req.method === 'PUT') {
    const auth = requireRole(req, res, ['ADMIN']);
    if (!auth) return;

    try {
      const result = updateClassSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        });
      }

      const data = result.data;

      // Build update object
      const updateData = {};
      if (data.title) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.subject) updateData.subject = data.subject;
      if (data.level) updateData.level = data.level;
      if (data.scheduledTime) updateData.scheduledTime = new Date(data.scheduledTime);
      if (data.duration) updateData.duration = data.duration;
      if (data.maxStudents) updateData.maxStudents = data.maxStudents;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.topics) updateData.topics = JSON.stringify(data.topics);
      if (data.meetUrl !== undefined) updateData.meetUrl = data.meetUrl;
      if (data.status) updateData.status = data.status;

      const updated = await prisma.class.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json({
        message: 'Class updated successfully',
        class: {
          ...updated,
          topics: updated.topics ? JSON.parse(updated.topics) : [],
        },
      });

    } catch (error) {
      console.error('Update class error:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Class not found' });
      }
      return res.status(500).json({ error: 'Failed to update class' });
    }
  }

  // DELETE - Delete class (admin only)
  if (req.method === 'DELETE') {
    const auth = requireRole(req, res, ['ADMIN']);
    if (!auth) return;

    try {
      await prisma.class.delete({
        where: { id },
      });

      return res.status(200).json({
        message: 'Class deleted successfully',
      });

    } catch (error) {
      console.error('Delete class error:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Class not found' });
      }
      return res.status(500).json({ error: 'Failed to delete class' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: 'Method not allowed' });
}
