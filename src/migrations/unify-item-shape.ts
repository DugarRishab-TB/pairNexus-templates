import { ICON_NAMES, type IconChoice, type IconName } from '../slots/index.js'

/**
 * One-shot migration that transforms the 10 array-of-items sections
 * from their historical shapes to the new common modal-driven shape
 * (`{ icon, heading, description }` + optional extras).
 *
 * Idempotent: each transformer checks for the new shape first and
 * returns the input unchanged if it's already migrated. The API runs
 * the registered transformers on every page version on boot.
 *
 * The transformers are pure functions: `oldItem → newItem`. The runner
 * in pairNexus-api walks every page version and applies the matching
 * transformer per template.
 */

export type Item = Record<string, unknown>

// Common helpers -------------------------------------------------------------

/** A placeholder icon used when an old item didn't have one. Image
 *  kind with a sentinel publicId that the public renderer treats as
 *  "no icon" (paired with the existing `isSeedPlaceholder` check). */
const PLACEHOLDER_ICON: IconChoice = {
  kind: 'image',
  data: { publicId: 'placeholder', alt: '' },
}

/** Wrap a plain string into the text-slot shape: `{ type: 'text', data: { text } }`. */
function textSlot(text: string) {
  return { type: 'text', data: { text } }
}

/** Wrap HTML into the richtext-slot shape: `{ type: 'richtext', data: { html } }`. */
function richtextSlot(html: string) {
  return { type: 'richtext', data: { html } }
}

/** Wrap a lucide icon name into the iconChoice lucide kind. Falls back to
 *  the first valid ICON_NAME if the input isn't in the closed set. */
function lucideIcon(name: string): IconChoice {
  const safe: IconName = (ICON_NAMES as readonly string[]).includes(name)
    ? (name as IconName)
    : ICON_NAMES[0]
  return { kind: 'lucide', data: { name: safe } }
}

/** Wrap a `publicId/alt` image into the iconChoice image kind. */
function imageIcon(publicId: string, alt?: string): IconChoice {
  return { kind: 'image', data: { publicId, alt: alt ?? '' } }
}

/** Check if the item is already in the new common shape. */
function isMigrated(item: Item): boolean {
  return (
    typeof item === 'object' &&
    item !== null &&
    'icon' in item &&
    'heading' in item &&
    'description' in item
  )
}

// Per-template transformers --------------------------------------------------

/** testimonials_v1: { quote, name, role, avatar } → { icon, heading, description, role? } */
function migrateTestimonialItem(item: Item): Item {
  if (isMigrated(item)) return item
  const avatar = (item.avatar as { publicId?: string; alt?: string } | undefined) ?? undefined
  const icon: IconChoice = avatar?.publicId ? imageIcon(avatar.publicId, avatar.alt) : PLACEHOLDER_ICON
  const name = typeof item.name === 'string' ? item.name : ''
  const role = typeof item.role === 'string' ? item.role : ''
  const quote = typeof item.quote === 'string' ? item.quote : ''
  // If role is non-empty, fold it into the heading so the public render
  // doesn't lose it ("Jane Doe · CEO"). Otherwise the heading is just the name.
  const heading = role ? `${name} · ${role}` : name
  const out: Item = {
    icon,
    heading: textSlot(heading),
    description: richtextSlot(quote),
  }
  if (role) out.role = role
  return out
}

/** blog_grid_v1: { image, category, title, excerpt, author, date } → { icon, heading, description, category?, author?, date? } */
function migrateBlogPostItem(item: Item): Item {
  if (isMigrated(item)) return item
  const image = (item.image as { publicId?: string; alt?: string } | undefined) ?? undefined
  const icon: IconChoice = image?.publicId ? imageIcon(image.publicId, image.alt) : PLACEHOLDER_ICON
  const title = typeof item.title === 'string' ? item.title : ''
  const excerpt = typeof item.excerpt === 'string' ? item.excerpt : ''
  const author = typeof item.author === 'string' ? item.author : ''
  const dateText =
    item.date && typeof item.date === 'object' && 'data' in (item.date as Item)
      ? ((item.date as { data: { text?: string } }).data?.text ?? '')
      : ''
  // Embed author/date as a meta line at the top of the description so
  // the public render doesn't lose them when the editor uses the
  // modal-only flow.
  const meta = [author, dateText].filter(Boolean).join(' · ')
  const html = meta ? `<p><em>${escapeHtml(meta)}</em></p>${escapeHtml(excerpt)}` : escapeHtml(excerpt)
  const out: Item = {
    icon,
    heading: textSlot(title),
    description: richtextSlot(`<p>${html}</p>`),
  }
  if (typeof item.category === 'string') out.category = item.category
  if (author) out.author = author
  if (item.date) out.date = item.date
  return out
}

/** faq_v1: { q, a } → { icon, heading, description } */
function migrateFaqItem(item: Item): Item {
  if (isMigrated(item)) return item
  const q = typeof item.q === 'string' ? item.q : ''
  const a = typeof item.a === 'string' ? item.a : ''
  return {
    icon: PLACEHOLDER_ICON,
    heading: textSlot(q),
    description: richtextSlot(`<p>${escapeHtml(a)}</p>`),
  }
}

/** stepper_feature_v1: { title, subtitle, image, body, cta } → { icon, heading, description, subtitle?, cta? } */
function migrateStepperItem(item: Item): Item {
  if (isMigrated(item)) return item
  const image = (item.image as { publicId?: string; alt?: string } | undefined) ?? undefined
  const icon: IconChoice = image?.publicId ? imageIcon(image.publicId, image.alt) : PLACEHOLDER_ICON
  const title = typeof item.title === 'string' ? item.title : ''
  const body = typeof item.body === 'string' ? item.body : ''
  const out: Item = {
    icon,
    heading: textSlot(title),
    description: richtextSlot(`<p>${escapeHtml(body)}</p>`),
  }
  if (typeof item.subtitle === 'string') out.subtitle = item.subtitle
  if (item.cta) out.cta = item.cta
  return out
}

/** feature_alternating_v1: { title, body, image, imageSide } → { icon, heading, description }
 *  The old `imageSide` toggle is dropped — the public renderer now
 *  alternates by index. */
function migrateAlternatingRowItem(item: Item): Item {
  if (isMigrated(item)) return item
  const image = (item.image as { publicId?: string; alt?: string } | undefined) ?? undefined
  const icon: IconChoice = image?.publicId ? imageIcon(image.publicId, image.alt) : PLACEHOLDER_ICON
  const title = typeof item.title === 'string' ? item.title : ''
  const body = typeof item.body === 'string' ? item.body : ''
  return {
    icon,
    heading: textSlot(title),
    description: richtextSlot(`<p>${escapeHtml(body)}</p>`),
  }
}

/** tabbed_features_v1: { label, title, body, bullets, diagram, cta } → { icon, heading, description, label?, bullets?, cta? } */
function migrateTabbedItem(item: Item): Item {
  if (isMigrated(item)) return item
  const diagram = (item.diagram as { publicId?: string; alt?: string } | undefined) ?? undefined
  const icon: IconChoice = diagram?.publicId ? imageIcon(diagram.publicId, diagram.alt) : PLACEHOLDER_ICON
  const title = typeof item.title === 'string' ? item.title : ''
  const body = typeof item.body === 'string' ? item.body : ''
  const out: Item = {
    icon,
    heading: textSlot(title),
    description: richtextSlot(`<p>${escapeHtml(body)}</p>`),
  }
  if (typeof item.label === 'string') out.label = item.label
  if (Array.isArray(item.bullets)) out.bullets = item.bullets
  if (item.cta) out.cta = item.cta
  return out
}

/** feature_grid_2x2_v1: { title, body, decoration } → { icon, heading, description } */
function migrateGridCardItem(item: Item): Item {
  if (isMigrated(item)) return item
  const decoration = (item.decoration as { name?: string } | undefined) ?? undefined
  const icon: IconChoice = decoration?.name ? lucideIcon(decoration.name) : PLACEHOLDER_ICON
  const title = typeof item.title === 'string' ? item.title : ''
  const body = typeof item.body === 'string' ? item.body : ''
  return {
    icon,
    heading: textSlot(title),
    description: richtextSlot(`<p>${escapeHtml(body)}</p>`),
  }
}

/** voice_ai_cards_v1 / stats_with_video_v1: { value, label, icon } → { icon, heading, description } */
function migrateStatItem(item: Item): Item {
  if (isMigrated(item)) return item
  const iconOld = (item.icon as { name?: string } | undefined) ?? undefined
  const icon: IconChoice = iconOld?.name ? lucideIcon(iconOld.name) : PLACEHOLDER_ICON
  const value = typeof item.value === 'string' ? item.value : ''
  const label = typeof item.label === 'string' ? item.label : ''
  return {
    icon,
    heading: textSlot(value),
    description: richtextSlot(`<p>${escapeHtml(label)}</p>`),
  }
}

/** feature_split_v1.bullets: { q, a } → { icon, heading, description }
 *  Same shape as FAQ items, but the array lives at slots.bullets.data.items
 *  (inside a faq slot) and uses the same transformer. */
const migrateBulletItem = migrateFaqItem

// Public API -----------------------------------------------------------------

/** Per-template transformer map. The runner looks up the templateKey
 *  in this map and applies the matching function to each item. */
export const itemTransformers: Record<string, (item: Item) => Item> = {
  testimonials_v1: migrateTestimonialItem,
  blog_grid_v1: migrateBlogPostItem,
  faq_v1: migrateFaqItem,
  stepper_feature_v1: migrateStepperItem,
  feature_alternating_v1: migrateAlternatingRowItem,
  tabbed_features_v1: migrateTabbedItem,
  feature_grid_2x2_v1: migrateGridCardItem,
  voice_ai_cards_v1: migrateStatItem,
  stats_with_video_v1: migrateStatItem,
  // feature_split_v1 bullets are nested inside a faq slot; the runner
  // is responsible for unwrapping slots.bullets.data.items.
  feature_split_v1__bullets: migrateBulletItem,
}

/** Per-template list path. Tells the runner which slot holds the
 *  array of items for each template. `null` for templates without
 *  an item list (e.g. nav_v1). */
export const itemListPaths: Record<string, string[] | null> = {
  testimonials_v1: ['testimonials'],
  blog_grid_v1: ['posts'],
  faq_v1: ['items'],
  stepper_feature_v1: ['steps'],
  feature_alternating_v1: ['rows'],
  tabbed_features_v1: ['tabs'],
  feature_grid_2x2_v1: ['cards'],
  voice_ai_cards_v1: ['cards'],
  stats_with_video_v1: ['stats'],
  // feature_split_v1 bullets are nested one level deeper (faq slot).
  feature_split_v1: ['bullets', 'data', 'items'],
}

/** Returns true if the given templateKey has a known item migration. */
export function hasItemMigration(templateKey: string): boolean {
  return templateKey in itemTransformers
}

/** Run the matching migration for a section's items. Returns the
 *  migrated slots object (or the input unchanged if no migration
 *  applies). */
export function migrateSectionSlots(templateKey: string, slots: Record<string, unknown>): Record<string, unknown> {
  const path: string[] | null = itemListPaths[templateKey] ?? null
  const transformer: ((item: Item) => Item) | undefined = itemTransformers[templateKey]
  if (!path || !transformer) return slots
  // Walk the path. For feature_split_v1, the path is ['bullets','data','items'].
  let parent: any = slots
  for (let i = 0; i < path.length - 1; i++) {
    if (!parent || typeof parent !== 'object') return slots
    const key = path[i]
    if (key === undefined) return slots
    parent = parent[key]
  }
  const listKey = path[path.length - 1]
  if (listKey === undefined) return slots
  if (!parent || !Array.isArray(parent[listKey])) return slots
  parent[listKey] = (parent[listKey] as Item[]).map(transformer)
  return slots
}

// Utils ----------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
