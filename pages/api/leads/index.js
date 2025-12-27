import prisma from '../../../lib/db';
import { z } from 'zod';
import { sendEmail, leadMagnetTemplate } from '../../../lib/email';
import { applyRateLimit } from '../../../lib/rate-limit';

const leadSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    source: z.string().optional(),
});

export default async function handler(req, res) {
    // 1. Rate Limiting (3 attempts per 10 minutes)
    if (!await applyRateLimit(req, res, {
        limit: 3,
        windowMs: 10 * 60 * 1000,
        keyPrefix: 'leads'
    })) return;

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method Not Allowed');
    }

    const result = leadSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const { email, name, source } = result.data;

    try {
        // Upsert Lead to capture re-conversions or new leads
        await prisma.lead.upsert({
            where: { email },
            update: { source },
            create: { email, name, source }
        });

        // Send the resource email
        await sendEmail({
            to: email,
            subject: 'Your Free SAT Math Cheat Sheet 📚',
            html: leadMagnetTemplate(name || 'Future Achiever'),
        });

        res.status(200).json({ success: true });
    } catch (e) {
        console.error('Lead Capture Error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
