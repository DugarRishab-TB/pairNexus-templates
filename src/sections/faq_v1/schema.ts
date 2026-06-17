import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { commonItemFields } from '../_common/common-item.js'

// Standalone FAQ accordion. Each item is the common modal-driven shape
// (icon + heading + description); no section-specific extras. The icon
// is optional in the schema because FAQ items historically didn't have
// one, but the new Add-Item modal requires it (the migration adds a
// placeholder icon when transforming old data). See
// docs/home-03-parity-gap.md §9.1.

const faqItemSchema = commonItemFields.extend({})

export const faqV1Schema = z.object({
  templateKey: z.literal('faq_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    items: z.array(faqItemSchema).min(1).max(20),
  }),
})

export type FaqV1 = z.infer<typeof faqV1Schema>
