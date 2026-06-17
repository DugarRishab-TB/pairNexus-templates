/**
 * Test helper: build a common modal-driven item (icon + heading + description)
 * with sensible defaults that pass the new schemas. Used by section
 * tests that previously built items in the old per-section shape.
 */
import type { IconChoice, IconName } from '../../src/slots/index.js'

export interface CommonItemOverrides {
  icon?: IconChoice
  heading?: string
  description?: { html: string }
  /** Per-section optional extras (role, subtitle, label, bullets, cta, ...). */
  extras?: Record<string, unknown>
}

export function commonItem(over: CommonItemOverrides = {}): Record<string, unknown> {
  const icon: IconChoice =
    over.icon ?? { kind: 'image', data: { publicId: 'placeholder', alt: '' } }
  const out: Record<string, unknown> = {
    icon,
    heading: { type: 'text', data: { text: over.heading ?? 'Heading' } },
    description: over.description ?? { type: 'richtext', data: { html: '<p>Body</p>' } },
    ...(over.extras ?? {}),
  }
  return out
}

export function lucideItem(name: IconName = 'sparkles', over: CommonItemOverrides = {}): Record<string, unknown> {
  return commonItem({ ...over, icon: { kind: 'lucide', data: { name } } })
}
