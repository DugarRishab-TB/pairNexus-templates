import { z } from 'zod'

export const videoDataSchema = z.object({
  publicId: z.string().min(1),
  alt: z.string().min(1).max(500),
})

export const videoSlot = z.object({
  type: z.literal('video'),
  data: videoDataSchema,
})

export type VideoSlot = z.infer<typeof videoSlot>
