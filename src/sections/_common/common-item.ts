import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { richtextDataSchema } from '../../slots/richtext.js'
import { iconChoiceSchema } from '../../slots/icon-choice.js'

/**
 * The three fields every per-item "Add" modal collects, regardless of
 * which section is being edited. Each affected section's item schema
 * extends this with section-specific optional extras:
 *
 *   const testimonialItemSchema = commonItemFields.extend({ role: z.string()...optional() })
 *
 * `icon` is the discriminated union: image OR lucide, one required.
 * `heading` is a single-line text slot, 1–200 chars.
 * `description` is a richtext slot, 1–2000 chars of sanitized HTML.
 */
export const commonItemFields = z.object({
  icon: iconChoiceSchema,
  heading: z.object({ type: z.literal('text'), data: textDataSchema }),
  description: z.object({ type: z.literal('richtext'), data: richtextDataSchema }),
})

export type CommonItemFields = z.infer<typeof commonItemFields>
