import { z } from 'zod'

export const ctaDataSchema = z.object({
  label: z.string().min(1).max(100),
  href: z.string().min(1).max(2000),
  variant: z.enum(['primary', 'secondary', 'ghost']),
})

export const ctaSlot = z.object({
  type: z.literal('cta'),
  data: ctaDataSchema,
})

export type CtaSlot = z.infer<typeof ctaSlot>
