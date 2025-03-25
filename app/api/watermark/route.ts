// pages/api/watermark.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { v2 as cloudinary } from "cloudinary"
import formidable, { File } from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// Helper to parse FormData with formidable
const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { fields, files } = await parseForm(req)

    const watermarkText = fields.watermarkText as unknown as string
    const uploadedFile = files.file as unknown as File
    const filepath = uploadedFile.filepath

    // Upload to Cloudinary with watermark transformation
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      transformation: [
        {
          overlay: {
            font_family: "Arial",
            font_size: 50,
            text: watermarkText,
          },
          gravity: "south_east",
          opacity: 60,
          x: 20,
          y: 20,
        },
      ],
    })

    return res.status(200).json({ url: uploadResult.secure_url })
  } catch (error) {
    console.error("API Error:", error)
    return res.status(500).json({ message: "Server Error" })
  }
}
