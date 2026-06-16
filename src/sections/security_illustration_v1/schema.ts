import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'

// Full-bleed illustration section with optional overlay heading. Models
// a single decorative image with a small caption. See
// docs/home-03-parity-gap.md §9.1.

export const securityIllustrationV1Schema = z.object({
  templateKey: z.literal('security_illustration_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }).optional(),
    image: z.object({ type: z.literal('image'), data: imageDataSchema }),
    overlayHeading: z.object({ type: z.literal('text'), data: textDataSchema }).optional(),
    overlayBody: z.object({ type: z.literal('text'), data: textDataSchema }).optional(),
  }),
})

export type SecurityIllustrationV1 = z.infer<typeof securityIllustrationV1Schema>
