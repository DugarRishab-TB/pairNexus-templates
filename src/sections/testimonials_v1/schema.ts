import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { videoDataSchema } from '../../slots/video.js'
import { commonItemFields } from '../_common/common-item.js'

// 3 testimonial cards with an optional central video play button. Each
// item is the common modal-driven shape (icon + heading + description)
// plus an optional `role` extra. Old shape: { quote, name, role, avatar }.
// New shape: { icon, heading, description, role? }. See
// docs/home-03-parity-gap.md §9.1.

const testimonialItemSchema = commonItemFields.extend({
  role: z.string().max(100).optional(),
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
