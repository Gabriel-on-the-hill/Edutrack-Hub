import { buffer } from 'stream/consumers'; // Node 15+
import Stripe from 'stripe';
import prisma from '../../../lib/db';
import { sendEmail, enrollmentConfirmationTemplate } from '../../../lib/email';

// Disable the default body parser to handle the raw stream
export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function getRawBody(req) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method Not Allowed');
    }

    const buf = await getRawBody(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Extract metadata
        const { classId, userId } = session.metadata;
        const paymentIntentId = session.payment_intent;

        console.log(`Processing successful checkout for user ${userId} class ${classId}`);

        try {
            // 1. Update Payment Record
            await prisma.payment.updateMany({
                where: { stripeSessionId: session.id },
                data: {
                    status: 'COMPLETED',
                    stripePaymentId: typeof paymentIntentId === 'string' ? paymentIntentId : undefined,
                    paidAt: new Date(),
                },
            });

            // 2. Create/Confirm Enrollment
            // Use upsert to be safe (idempotency)
            const enrollment = await prisma.enrollment.upsert({
                where: {
                    userId_classId: { userId, classId },
                },
                update: {
                    status: 'CONFIRMED',
                    confirmedAt: new Date(),
                    paymentId: (await prisma.payment.findFirst({ where: { stripeSessionId: session.id } }))?.id,
                },
                create: {
                    userId,
                    classId,
                    status: 'CONFIRMED',
                    confirmedAt: new Date(),
                    paymentId: (await prisma.payment.findFirst({ where: { stripeSessionId: session.id } }))?.id,
                },
                include: {
                    class: true,
                    user: true,
                },
            });

            // 3. Send Confirmation Email
            if (enrollment.user.email) {
                await sendEmail({
                    to: enrollment.user.email,
                    subject: 'Enrollment Confirmed! 🎓',
                    html: enrollmentConfirmationTemplate(enrollment.user.name, enrollment.class.title, enrollment.class.meetingId),
                }).catch(err => console.error('Failed to send confirmation email', err));
            }

        } catch (error) {
            console.error('Error fulfilling webhook:', error);
            // Return 500 to retry? Or 200 to stop retry loop if logic error?
            // Usually 500 triggers retry.
            return res.status(500).json({ error: 'Database error' });
        }
    }

    res.status(200).json({ received: true });
}
