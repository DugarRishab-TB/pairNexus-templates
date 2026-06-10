import { describe, it, expect } from 'vitest'
import { featureSplitV1Schema } from '../../src/sections/feature_split_v1/schema.js'

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
            body: 'Manual processes consume valuable time...',
          },
        },
        bullets: {
          type: 'faq',
          data: {
            items: [
              { q: 'Manual Data Entry', a: 'Consumes valuable clinical time.' },
              { q: 'Errors', a: 'Lead to revenue leakage.' },
              { q: 'Fragmented Systems', a: 'Disrupt continuity.' },
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

  it('rejects more than 3 bullets', () => {
    const items = Array.from({ length: 4 }, (_, i) => ({ q: `Q${i}`, a: `A${i}` }))
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
