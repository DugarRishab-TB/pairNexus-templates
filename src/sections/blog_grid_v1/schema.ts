import { z } from 'zod'
import { textDataSchema } from '../../slots/text.js'
import { commonItemFields } from '../_common/common-item.js'

// 3 blog/news cards. Each post is the common modal-driven shape (icon
// + heading + description) plus optional `category`, `author`, and
// `date` extras. Old shape: { image, category, title, excerpt, author,
// date }. New shape: { icon, heading, description, category?, author?, date? }.
// The migration embeds `author` and `date` as a meta line in the
// description so the public render doesn't lose them. See
// docs/home-03-parity-gap.md §9.1.

const blogPostSchema = commonItemFields.extend({
  category: z.string().max(50).optional(),
  author: z.string().max(100).optional(),
  date: z.object({ type: z.literal('text'), data: textDataSchema }).optional(),
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
