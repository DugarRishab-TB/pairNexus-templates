import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'
import { videoDataSchema } from '../../slots/video.js'

// 3 testimonial cards with an optional central video play button. The
// testimonial shape (quote, name, role, avatar) matches the existing
// testimonial slot. See docs/home-03-parity-gap.md §9.1.

const testimonialItemSchema = z.object({
  quote: z.string().min(1).max(1000),
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  avatar: imageDataSchema.optional(),
})

export const testimonialsV1Schema = z.object({
  templateKey: z.literal('testimonials_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    testimonials: z.array(testimonialItemSchema).length(3),
    video: z.object({ type: z.literal('video'), data: videoDataSchema }).optional(),
  }),
})

export type TestimonialsV1 = z.infer<typeof testimonialsV1Schema>
