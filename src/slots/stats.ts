import { z } from 'zod'
import { iconDataSchema } from './icon.js'

export const statItemSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(100),
  icon: iconDataSchema,
})

export const statsDataSchema = z.object({
  items: z.array(statItemSchema).min(1).max(4),
})

export const statsSlot = z.object({
  type: z.literal('stats'),
  data: statsDataSchema,
})

export type StatsSlot = z.infer<typeof statsSlot>
export type StatItem = z.infer<typeof statItemSchema>
