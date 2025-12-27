import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { requireRole } from '../../../lib/auth';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Use a temporary folder for formidable
    const uploadDir = path.join(process.cwd(), 'tmp_uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ALLOWED_MIMETYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024, // 50MB
    });

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
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

            // Validate MIME type
            if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
                if (fs.existsSync(file.filepath)) {
                    fs.unlinkSync(file.filepath);
                }
                res.status(400).json({ error: `File type ${file.mimetype} not allowed` });
                return resolve();
            }

            try {
                // Upload to Cloudinary
                const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';

                const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
                    folder: 'edutrack_hub',
                    resource_type: resourceType,
                    use_filename: true,
                });

                // Delete the local temporary file
                if (fs.existsSync(file.filepath)) {
                    fs.unlinkSync(file.filepath);
                }

                res.status(200).json({
                    url: uploadResponse.secure_url,
                    name: path.basename(file.originalFilename || uploadResponse.public_id),
                    size: file.size,
                    type: file.mimetype,
                    cloudinaryId: uploadResponse.public_id
                });
                resolve();

            } catch (cloudErr) {
                console.error('Cloudinary Error:', cloudErr);
                // Clean up local file even on cloud failure
                if (fs.existsSync(file.filepath)) {
                    fs.unlinkSync(file.filepath);
                }
                res.status(500).json({ error: 'Failed to upload to cloud storage' });
                resolve();
            }
        });
    });
}
