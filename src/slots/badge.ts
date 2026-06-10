import { z } from 'zod'

export const badgeDataSchema = z.object({
  label: z.string().min(1).max(50),
  variant: z.enum(['info', 'success', 'warning', 'neutral']),
})

export const badgeSlot = z.object({
  type: z.literal('badge'),
  data: badgeDataSchema,
})

export type BadgeSlot = z.infer<typeof badgeSlot>
