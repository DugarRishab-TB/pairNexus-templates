import { z } from 'zod'

export const textDataSchema = z.object({
  text: z.string().min(1).max(500),
})

export const textSlot = z.object({
  type: z.literal('text'),
  data: textDataSchema,
})

export type TextSlot = z.infer<typeof textSlot>
