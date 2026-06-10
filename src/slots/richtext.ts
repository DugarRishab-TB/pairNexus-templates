import { z } from 'zod'

export const richtextDataSchema = z.object({
  html: z.string().min(1).max(20000),
})

export const richtextSlot = z.object({
  type: z.literal('richtext'),
  data: richtextDataSchema,
})

export type RichtextSlot = z.infer<typeof richtextSlot>
