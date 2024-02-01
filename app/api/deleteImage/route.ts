import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Data = {
  message?: string;
  error?: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const requestBody = JSON.parse(req.body);

    if (!requestBody.publicId) {
      return res.status(400).json({ error: "Missing public ID" });
    }

    const publicId = requestBody.publicId;

    await cloudinary.v2.uploader.destroy(publicId);

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ error: "Error deleting image" });
  }
}
