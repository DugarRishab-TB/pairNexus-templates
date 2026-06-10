import { z } from 'zod'

// Closed set: add names here as new icons are introduced in the design system.
export const ICON_NAMES = [
  'shield',
  'check',
  'arrow-right',
  'clock',
  'mail',
  'phone',
  'mic',
  'cpu',
  'database',
  'lock',
  'sparkles',
  'users',
  'chart',
  'globe',
  'play',
  'pause',
] as const

export const iconDataSchema = z.object({
  name: z.enum(ICON_NAMES),
})

export const iconSlot = z.object({
  type: z.literal('icon'),
  data: iconDataSchema,
})

export type IconSlot = z.infer<typeof iconSlot>
export type IconName = (typeof ICON_NAMES)[number]
