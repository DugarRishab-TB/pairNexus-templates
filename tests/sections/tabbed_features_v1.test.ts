import { describe, it, expect } from 'vitest'
import { tabbedFeaturesV1Schema } from '../../src/sections/tabbed_features_v1/schema.js'
import { commonItem } from '../_helpers/common-item.js'

describe('tabbedFeaturesV1Schema', () => {
  it('accepts 5 tabs', () => {
    const labels = [
      'Interoperability',
      'Analytics',
      'Care Co-ordination',
      'Security & Compliance',
      'Referral & Handoffs',
    ]
    const tabs = labels.map((label) =>
      commonItem({
        heading: `${label} title`,
        description: { type: 'richtext', data: { html: `<p>${label} body</p>` } },
        extras: {
          label,
          bullets: ['A', 'B', 'C'],
          cta: { label: 'Book Demo', href: '/contact', variant: 'primary' as const },
        },
      }),
    )
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
    const tabs = Array.from({ length: 7 }, () =>
      commonItem({
        extras: {
          label: 'T',
          bullets: ['A'],
          cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
        },
      }),
    )
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
