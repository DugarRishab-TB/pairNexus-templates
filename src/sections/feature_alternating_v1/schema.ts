import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'

export const alternatingRowSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  image: imageDataSchema,
  imageSide: z.enum(['left', 'right']),
})

export const featureAlternatingV1Schema = z.object({
  templateKey: z.literal('feature_alternating_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    rows: z.array(alternatingRowSchema).min(1).max(6),
  }),
})

export type FeatureAlternatingV1 = z.infer<typeof featureAlternatingV1Schema>
