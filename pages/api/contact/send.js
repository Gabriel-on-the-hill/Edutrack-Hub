// POST /api/contact/send
// Saves contact form submissions to database

import { z } from 'zod';
import prisma from '../../../lib/db';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, subject, message } = result.data;

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      },
    });

    // TODO: Send email notification via Resend

    return res.status(200).json({
      message: 'Thank you for your message. We\'ll get back to you soon!',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again.',
    });
  }
}
