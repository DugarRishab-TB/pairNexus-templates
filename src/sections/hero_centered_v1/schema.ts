import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { richtextDataSchema } from '../../slots/richtext.js'
import { ctaDataSchema } from '../../slots/cta.js'
import { imageDataSchema } from '../../slots/image.js'
import { statsDataSchema } from '../../slots/stats.js'

export const heroCenteredV1Schema = z.object({
  templateKey: z.literal('hero_centered_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    body: z.object({ type: z.literal('richtext'), data: richtextDataSchema }),
    primaryCta: z.object({ type: z.literal('cta'), data: ctaDataSchema }),
    secondaryCta: z.object({ type: z.literal('cta'), data: ctaDataSchema }),
    backgroundImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
    stats: z.object({ type: z.literal('stats'), data: statsDataSchema }),
  }),
})

export type HeroCenteredV1 = z.infer<typeof heroCenteredV1Schema>
