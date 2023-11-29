import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (use environment variables for sensitive data)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { publicId } = req.body;

    try {
      await cloudinary.uploader.destroy(publicId);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the image', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}