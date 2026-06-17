import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { commonItemFields } from '../_common/common-item.js'

// 3-up stat row. Each card is the common modal-driven shape (icon +
// heading + description). The old `{ value, label, icon }` stat
// shape maps: `value` → heading, `label` → description, `icon` →
// icon. Fixed 3 cards. See docs/home-03-parity-gap.md §9.1.

const voiceAiCardSchema = commonItemFields.extend({})

export const voiceAiCardsV1Schema = z.object({
  templateKey: z.literal('voice_ai_cards_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    cards: z.array(voiceAiCardSchema).length(3),
  }),
})

export type VoiceAiCardsV1 = z.infer<typeof voiceAiCardsV1Schema>
