import { z } from 'zod'

export const imageDataSchema = z.object({
  publicId: z.string().min(1), // Cloudinary public_id
  alt: z.string().min(1).max(500),
})

export const imageSlot = z.object({
  type: z.literal('image'),
  data: imageDataSchema,
})

export type ImageSlot = z.infer<typeof imageSlot>
