import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'
import { ctaDataSchema } from '../../slots/cta.js'

export const tabItemSchema = z.object({
  label: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  bullets: z.array(z.string().min(1).max(200)).min(0).max(10),
  diagram: imageDataSchema,
  cta: ctaDataSchema,
})

export const tabbedFeaturesV1Schema = z.object({
  templateKey: z.literal('tabbed_features_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    tabs: z.array(tabItemSchema).min(1).max(6),
  }),
})

export type TabbedFeaturesV1 = z.infer<typeof tabbedFeaturesV1Schema>
