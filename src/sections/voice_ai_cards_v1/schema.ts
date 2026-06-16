import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { iconDataSchema } from '../../slots/icon.js'

// 3-up stat row. Differs from feature_grid_2x2_v1 in that the card
// shape is stat-shaped (value, label, icon) rather than feature-shaped
// (title, body, decoration). Fixed 3 cards. See
// docs/home-03-parity-gap.md §9.1.

const voiceAiCardSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(100),
  icon: iconDataSchema,
})

export const voiceAiCardsV1Schema = z.object({
  templateKey: z.literal('voice_ai_cards_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    cards: z.array(voiceAiCardSchema).length(3),
  }),
})

export type VoiceAiCardsV1 = z.infer<typeof voiceAiCardsV1Schema>
