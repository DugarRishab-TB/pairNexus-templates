import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { videoDataSchema } from '../../slots/video.js'
import { commonItemFields } from '../_common/common-item.js'

// Stats grid surrounding a central video play button. Each stat is the
// common modal-driven shape (icon + heading + description). The old
// `{ value, label, icon }` shape maps: `value` → heading, `label` →
// description, `icon` → icon. See docs/home-03-parity-gap.md §9.1.

const statItemSchema = commonItemFields.extend({})

export const statsWithVideoV1Schema = z.object({
  templateKey: z.literal('stats_with_video_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    stats: z.array(statItemSchema).min(2).max(6),
    video: z.object({ type: z.literal('video'), data: videoDataSchema }),
    videoCaption: z.object({ type: z.literal('text'), data: textDataSchema }).optional(),
  }),
})

export type StatsWithVideoV1 = z.infer<typeof statsWithVideoV1Schema>
