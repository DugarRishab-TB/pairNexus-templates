import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { faqItemSchema } from '../../slots/faq.js'

// Standalone FAQ accordion. Reuses the existing faqItemSchema ({q, a})
// and the faq-slot shape. The renderer is a 'use client' component
// that toggles aria-expanded. See docs/home-03-parity-gap.md §9.1.

export const faqV1Schema = z.object({
  templateKey: z.literal('faq_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    items: z.array(faqItemSchema).min(1).max(20),
  }),
})

export type FaqV1 = z.infer<typeof faqV1Schema>
