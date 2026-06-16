import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { imageDataSchema } from '../../slots/image.js'

// 3 blog/news cards. Each post has image + category + title + excerpt +
// author + date. date is a free-text slot (not a Date type) so editors
// can put "Yesterday", "March 5", or an ISO string without coercion.
// See docs/home-03-parity-gap.md §9.1.

const blogPostSchema = z.object({
  image: imageDataSchema,
  category: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  author: z.string().min(1).max(100),
  date: z.object({ type: z.literal('text'), data: textDataSchema }),
})

export const blogGridV1Schema = z.object({
  templateKey: z.literal('blog_grid_v1'),
  slots: z.object({
    eyebrow: z.object({ type: z.literal('text'), data: textDataSchema }),
    headline: z.object({ type: z.literal('text'), data: textDataSchema }),
    posts: z.array(blogPostSchema).length(3),
  }),
})

export type BlogGridV1 = z.infer<typeof blogGridV1Schema>
