import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { ctaDataSchema } from '../../slots/cta.js'
import { commonItemFields } from '../_common/common-item.js'

// Numbered steps walking through a process. Each step is the common
// modal-driven shape (icon + heading + description) plus optional
// `subtitle` and `cta` extras. Old shape: { title, subtitle, image,
// body, cta }. New shape: { icon, heading, description, subtitle?, cta? }.

const stepItemSchema = commonItemFields.extend({
  subtitle: z.string().max(200).optional(),
  cta: ctaDataSchema.optional(),
})

export const stepperFeatureV1Schema = z.object({
  templateKey: z.literal('stepper_feature_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    steps: z.array(stepItemSchema).min(1).max(6),
  }),
})

export type StepperFeatureV1 = z.infer<typeof stepperFeatureV1Schema>
