import { describe, it, expect } from 'vitest'
import { featureSplitV1Schema } from '../../src/sections/feature_split_v1/schema.js'
import { commonItem } from '../_helpers/common-item.js'

describe('featureSplitV1Schema', () => {
  it('accepts a feature split section', () => {
    const result = featureSplitV1Schema.parse({
      templateKey: 'feature_split_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'AI SIMPLIFIES OPERATIONS' } },
        headline: { type: 'text', data: { text: 'Automating smarter' } },
        subcard: {
          type: 'card',
          data: {
            title: 'Workflow that Create Workflows Intelligently',
            body: 'Manual processes consume valuable time…',
          },
        },
        bullets: {
          type: 'faq',
          data: {
            // New common modal-driven shape; old `q`/`a` are gone.
            items: [
              commonItem({ heading: 'Manual Data Entry', description: { type: 'richtext', data: { html: '<p>Consumes valuable clinical time.</p>' } } }),
              commonItem({ heading: 'Errors', description: { type: 'richtext', data: { html: '<p>Lead to revenue leakage.</p>' } } }),
              commonItem({ heading: 'Fragmented Systems', description: { type: 'richtext', data: { html: '<p>Disrupt continuity.</p>' } } }),
            ],
          },
        },
        mockupImage: {
          type: 'image',
          data: { publicId: 'mockups/ai-scribe', alt: 'AI Scribe mockup' },
        },
      },
    })
    expect(result.templateKey).toBe('feature_split_v1')
  })

  it('rejects more than 6 bullets', () => {
    const items = Array.from({ length: 7 }, () => commonItem())
    expect(() =>
      featureSplitV1Schema.parse({
        templateKey: 'feature_split_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          subcard: { type: 'card', data: { title: 'x', body: 'x' } },
          bullets: { type: 'faq', data: { items } },
          mockupImage: { type: 'image', data: { publicId: 'x', alt: 'x' } },
        },
      })
    ).toThrow()
  })
})
