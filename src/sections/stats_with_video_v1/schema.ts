import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { iconDataSchema } from '../../slots/icon.js'
import { videoDataSchema } from '../../slots/video.js'

// Stats grid with a central video play button. The stat grid is a small
// stat item shape (value, label, icon); the video is the existing
// video slot. See docs/home-03-parity-gap.md §9.1.

const statItemSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(100),
  icon: iconDataSchema,
})

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
