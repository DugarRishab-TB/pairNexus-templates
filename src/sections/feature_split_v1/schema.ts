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
        items: z.array(faqItemSchema).min(1).max(3),
      }),
    }),
    mockupImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
  }),
})

export type FeatureSplitV1 = z.infer<typeof featureSplitV1Schema>
