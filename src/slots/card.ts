import { z } from 'zod'
import { imageDataSchema } from './image.js'
import { ctaDataSchema } from './cta.js'

export const cardDataSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  image: imageDataSchema.optional(),
  cta: ctaDataSchema.optional(),
})

export const cardSlot = z.object({
  type: z.literal('card'),
  data: cardDataSchema,
})

export type CardSlot = z.infer<typeof cardSlot>
