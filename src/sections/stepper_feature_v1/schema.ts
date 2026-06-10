import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'
import { ctaDataSchema } from '../../slots/cta.js'

export const stepItemSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().min(1).max(200),
  image: imageDataSchema,
  body: z.string().min(1).max(2000),
  cta: ctaDataSchema,
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
