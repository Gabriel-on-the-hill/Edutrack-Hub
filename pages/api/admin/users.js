
import prisma from '../../../lib/db';
import { getCurrentUser } from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const authUser = getCurrentUser(req);
        if (!authUser || authUser.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const students = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                _count: {
                    select: {
                        enrollments: true,
                        attendance: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json({ students });
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
