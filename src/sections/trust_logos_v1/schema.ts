import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'

export const trustLogosV1Schema = z.object({
  templateKey: z.literal('trust_logos_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    logos: z
      .array(z.object({ type: z.literal('image'), data: imageDataSchema }))
      .min(1)
      .max(12),
  }),
})

export type TrustLogosV1 = z.infer<typeof trustLogosV1Schema>
