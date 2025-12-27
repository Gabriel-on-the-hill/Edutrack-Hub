import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { requireRole } from '../../../lib/auth';

export const config = {
    api: {
        bodyParser: false, // Disabling bodyParser for formidable
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    // Require ADMIN role
    const user = requireRole(req, res, ['ADMIN']);
    if (!user) return;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists (double check)
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024, // 50MB
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Upload error:', err);
                res.status(500).json({ error: 'Failed to upload file' });
                return resolve();
            }

            const file = Array.isArray(files.file) ? files.file[0] : files.file;
            if (!file) {
                res.status(400).json({ error: 'No file uploaded' });
                return resolve();
            }

            // Generate public URL
            const fileName = path.basename(file.filepath);
            const publicUrl = `/uploads/${fileName}`;

            res.status(200).json({
                url: publicUrl,
                name: file.originalFilename || fileName,
                size: file.size,
            });
            resolve();
        });
    });
}
