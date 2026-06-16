import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { richtextDataSchema } from '../../slots/richtext.js'
import { ctaDataSchema } from '../../slots/cta.js'
import { imageDataSchema } from '../../slots/image.js'
import { iconDataSchema } from '../../slots/icon.js'

// Hero with tab strip, category pill group, search input, and illustration.
// Differs from hero_centered_v1 by being explicitly a "search" hero (tabs +
// pills + input) rather than a generic centered hero. See
// docs/home-03-parity-gap.md §5.6 / §9.1.

const tabItemSchema = z.object({
  label: z.string().min(1).max(50),
})

const pillItemSchema = z.object({
  label: z.string().min(1).max(50),
  icon: iconDataSchema.optional(),
})

export const heroSearchV1Schema = z.object({
  templateKey: z.literal('hero_search_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    body: z.object({ type: z.literal('richtext'), data: richtextDataSchema }),
    primaryCta: z.object({ type: z.literal('cta'), data: ctaDataSchema }),
    secondaryCta: z.object({ type: z.literal('cta'), data: ctaDataSchema }),
    backgroundImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
    illustrationImage: z.object({ type: z.literal('image'), data: imageDataSchema }),
    tabs: z.array(tabItemSchema).min(2).max(4),
    pills: z.array(pillItemSchema).min(2).max(8),
    searchPlaceholder: z.object({ type: z.literal('text'), data: textDataSchema }),
  }),
})

export type HeroSearchV1 = z.infer<typeof heroSearchV1Schema>
