import { z } from 'zod'

// Passthrough "doc" template used by the pairNexus-test /homeedits
// editor. The frontend owns the fine-grained shape of each section_N
// field; the server only verifies they're objects, so the editor can
// evolve without an upstream Zod migration. Slot keys mirror the
// fixed homeedits schema (section_2/3/5/6/7/9/10/11).

const sectionObject = z.record(z.string(), z.unknown())

export const homeEditDocV1Schema = z.object({
  templateKey: z.literal('homeedit_doc_v1'),
  slots: z.object({
    section_2:  sectionObject.optional(),
    section_3:  sectionObject.optional(),
    section_5:  sectionObject.optional(),
    section_6:  sectionObject.optional(),
    section_7:  sectionObject.optional(),
    section_9:  sectionObject.optional(),
    section_10: sectionObject.optional(),
    section_11: sectionObject.optional(),
  }),
})

export type HomeEditDocV1 = z.infer<typeof homeEditDocV1Schema>
