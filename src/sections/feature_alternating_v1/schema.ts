import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { commonItemFields } from '../_common/common-item.js'

// Stacked rows that alternate image and text left/right. Each row is
// the common modal-driven shape (icon + heading + description). The
// old `imageSide` (left/right) toggle is dropped — the public renderer
// now alternates by index, matching the original visual design. See
// docs/home-03-parity-gap.md §3.2.

const alternatingRowSchema = commonItemFields.extend({})
// Kept as a named export for the per-section `index.ts` re-export —
// external code (e.g. the public renderer) imports `alternatingRowSchema`
// from `pairNexus-templates/sections/feature_alternating_v1`.
export { alternatingRowSchema }

export const featureAlternatingV1Schema = z.object({
  templateKey: z.literal('feature_alternating_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    rows: z.array(alternatingRowSchema).min(1).max(6),
  }),
})

export type FeatureAlternatingV1 = z.infer<typeof featureAlternatingV1Schema>
