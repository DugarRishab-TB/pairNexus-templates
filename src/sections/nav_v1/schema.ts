import { z } from 'zod'
import { imageDataSchema } from '../../slots/image.js'
import { linkDataSchema } from '../../slots/link.js'
import { ctaDataSchema } from '../../slots/cta.js'

export const navV1Schema = z.object({
  templateKey: z.literal('nav_v1'),
  slots: z.object({
    logo: z.object({ type: z.literal('image'), data: imageDataSchema }),
    links: z.object({ type: z.literal('link'), data: linkDataSchema }),
    cta: z.object({ type: z.literal('cta'), data: ctaDataSchema }),
  }),
})

export type NavV1 = z.infer<typeof navV1Schema>
