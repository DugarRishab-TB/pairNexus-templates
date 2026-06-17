import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { cardDataSchema } from '../../slots/card.js'
import { imageDataSchema } from '../../slots/image.js'
import { commonItemFields } from '../_common/common-item.js'

// Two-column split: bullets on one side, image on the other. The
// `bullets` slot used to be a faq-shaped list of {q, a} items. It now
// holds the common modal-driven shape (icon + heading + description).
// `q` → heading, `a` → description. The old faq-slot wrapper is
// preserved for backward compatibility (the public renderer still
// reads `bullets.data.items`). See docs/home-03-parity-gap.md.

const bulletItemSchema = commonItemFields.extend({})

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
        items: z.array(bulletItemSchema).min(1).max(6),
      }),
    }),
    mockupImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
  }),
})

export type FeatureSplitV1 = z.infer<typeof featureSplitV1Schema>
