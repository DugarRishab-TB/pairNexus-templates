import { z } from 'zod'
import { imageDataSchema } from './image.js'
import { iconDataSchema } from './icon.js'

/**
 * The universal "icon" field for the Add-Item modal: the editor picks
 * EITHER an uploaded image (via MediaPickerModal) OR a lucide icon
 * (via the searchable grid). The discriminator `kind` records which
 * one was chosen so the public renderer can branch on it.
 *
 * One of the two variants is required, never both. The existing
 * `imageSlot` / `iconSlot` slot wrappers are still used elsewhere on
 * the page (e.g. a hero background image) — this slot is only for
 * the per-item icon field in array-of-items sections.
 */
export const iconChoiceSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('image'), data: imageDataSchema }),
  z.object({ kind: z.literal('lucide'), data: iconDataSchema }),
])

export type IconChoice = z.infer<typeof iconChoiceSchema>
export type IconChoiceKind = IconChoice['kind']
