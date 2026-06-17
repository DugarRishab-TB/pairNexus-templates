import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { ctaDataSchema } from '../../slots/cta.js'
import { commonItemFields } from '../_common/common-item.js'

// Client-side tabs. Each tab is the common modal-driven shape (icon +
// heading + description) plus optional `label`, `bullets`, and `cta`
// extras. Old shape: { label, title, body, bullets, diagram, cta }.
// New shape: { icon, heading, description, label?, bullets?, cta? }.

const tabItemSchema = commonItemFields.extend({
  label: z.string().max(50).optional(),
  bullets: z.array(z.string().min(1).max(200)).min(0).max(10).optional(),
  cta: ctaDataSchema.optional(),
})
export { tabItemSchema }

export const tabbedFeaturesV1Schema = z.object({
  templateKey: z.literal('tabbed_features_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    tabs: z.array(tabItemSchema).min(1).max(6),
  }),
})

export type TabbedFeaturesV1 = z.infer<typeof tabbedFeaturesV1Schema>
