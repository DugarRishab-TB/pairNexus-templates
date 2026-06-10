import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { iconDataSchema } from '../../slots/icon.js'

export const gridCardSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  decoration: iconDataSchema,
})

export const featureGrid2x2V1Schema = z.object({
  templateKey: z.literal('feature_grid_2x2_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    cards: z.array(gridCardSchema).length(4),
  }),
})

export type FeatureGrid2x2V1 = z.infer<typeof featureGrid2x2V1Schema>
