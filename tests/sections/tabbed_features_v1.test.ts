import { describe, it, expect } from 'vitest'
import { tabbedFeaturesV1Schema } from '../../src/sections/tabbed_features_v1/schema.js'

describe('tabbedFeaturesV1Schema', () => {
  it('accepts 5 tabs', () => {
    const tabs = [
      'Interoperability',
      'Analytics',
      'Care Co-ordination',
      'Security & Compliance',
      'Referral & Handoffs',
    ].map((label) => ({
      label,
      title: `${label} title`,
      body: `${label} body`,
      bullets: ['A', 'B', 'C'],
      diagram: { publicId: `diagram-${label}`, alt: `${label} diagram` },
      cta: { label: 'Book Demo', href: '/contact', variant: 'primary' as const },
    }))
    const result = tabbedFeaturesV1Schema.parse({
      templateKey: 'tabbed_features_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'EYE' } },
        headline: { type: 'text', data: { text: 'HEAD' } },
        tabs,
      },
    })
    expect(result.slots.tabs).toHaveLength(5)
  })

  it('rejects more than 6 tabs', () => {
    const tabs = Array.from({ length: 7 }, (_, i) => ({
      label: `T${i}`,
      title: 't',
      body: 'b',
      bullets: ['A'],
      diagram: { publicId: 'x', alt: 'x' },
      cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
    }))
    expect(() =>
      tabbedFeaturesV1Schema.parse({
        templateKey: 'tabbed_features_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          tabs,
        },
      })
    ).toThrow()
  })
})
