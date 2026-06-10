import { z } from 'zod'

export const faqItemSchema = z.object({
  q: z.string().min(1).max(300),
  a: z.string().min(1).max(2000),
})

export const faqDataSchema = z.object({
  items: z.array(faqItemSchema).min(1).max(20),
})

export const faqSlot = z.object({
  type: z.literal('faq'),
  data: faqDataSchema,
})

export type FaqSlot = z.infer<typeof faqSlot>
