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
    // Loosened from .length(4) to a 2–6 range so the same template can model
    // 3-up stat rows (e.g. Section 6 of Home-03) and 6-up icon grids without
    // requiring a second templateKey. The admin seed still defaults to 4.
    // See docs/home-03-parity-gap.md §3.2 / §12.2.
    cards: z.array(gridCardSchema).min(2).max(6),
  }),
})

export type FeatureGrid2x2V1 = z.infer<typeof featureGrid2x2V1Schema>
