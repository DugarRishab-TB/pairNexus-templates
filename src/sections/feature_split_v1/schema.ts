import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { cardDataSchema } from '../../slots/card.js'
import { faqItemSchema } from '../../slots/faq.js'
import { imageDataSchema } from '../../slots/image.js'

export const featureSplitV1Schema = z.object({
  templateKey: z.literal('feature_split_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    subcard: z.object({ type: z.literal('card'), data: cardDataSchema }),
    bullets: z.object({
      type: z.literal('faq'),
      data: z.object({
        // Loosened from .max(3) to .max(6) so this template can also model
        // "feature cards" rows in split sections (e.g. Section 8 of the
        // Home-03 design has 4 left-side cards). See docs/home-03-parity-gap.md.
        items: z.array(faqItemSchema).min(1).max(6),
      }),
    }),
    mockupImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
  }),
})

export type FeatureSplitV1 = z.infer<typeof featureSplitV1Schema>
