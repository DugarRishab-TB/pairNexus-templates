import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { linkDataSchema } from '../../slots/link.js'

export const footerColumnSchema = z.object({
  title: z.string().min(1).max(50),
  links: z.array(linkDataSchema).max(20),
})

export const footerV1Schema = z.object({
  templateKey: z.literal('footer_v1'),
  slots: z.object({
    columns: z.array(footerColumnSchema).min(1).max(6),
    copyright: z.object({ type: z.literal('text'), data: textDataSchema }),
  }),
})

export type FooterV1 = z.infer<typeof footerV1Schema>
