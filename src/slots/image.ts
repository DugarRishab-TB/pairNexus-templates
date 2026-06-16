import { z } from 'zod'

export const imageDataSchema = z.object({
  publicId: z.string().min(1), // Cloudinary public_id
  // `alt` is now optional so purely decorative images (e.g. a background
  // pattern or full-bleed illustration with an external caption) can use the
  // accessibility-correct empty string. Content images should still set
  // meaningful alt text. See docs/home-03-parity-gap.md §8.6.
  alt: z.string().max(500).optional(),
})

export const imageSlot = z.object({
  type: z.literal('image'),
  data: imageDataSchema,
})

export type ImageSlot = z.infer<typeof imageSlot>
