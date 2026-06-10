import { z } from 'zod'

export const linkDataSchema = z.object({
  label: z.string().min(1).max(100),
  href: z.string().min(1).max(2000),
})

export const linkSlot = z.object({
  type: z.literal('link'),
  data: linkDataSchema,
})

export type LinkSlot = z.infer<typeof linkSlot>
