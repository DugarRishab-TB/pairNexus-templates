import { z } from 'zod'
import { imageDataSchema } from './image.js'

export const testimonialDataSchema = z.object({
  quote: z.string().min(1).max(1000),
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  avatar: imageDataSchema.optional(),
})

export const testimonialSlot = z.object({
  type: z.literal('testimonial'),
  data: testimonialDataSchema,
})

export type TestimonialSlot = z.infer<typeof testimonialSlot>
