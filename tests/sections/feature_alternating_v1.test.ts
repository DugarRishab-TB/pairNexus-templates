import { describe, it, expect } from 'vitest'
import { featureAlternatingV1Schema } from '../../src/sections/feature_alternating_v1/schema.js'
import { commonItem } from '../_helpers/common-item.js'

describe('featureAlternatingV1Schema', () => {
  it('accepts 2 alternating rows', () => {
    const rows = [
      commonItem({ heading: 'Time-Saving Workflow', description: { type: 'richtext', data: { html: '<p>Streamline daily clinical operations…</p>' } } }),
      commonItem({ heading: 'Error Reduction', description: { type: 'richtext', data: { html: '<p>Leverage intelligent automation…</p>' } } }),
    ]
    const result = featureAlternatingV1Schema.parse({
      templateKey: 'feature_alternating_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'EYE' } },
        headline: { type: 'text', data: { text: 'HEAD' } },
        rows,
      },
    })
    expect(result.slots.rows).toHaveLength(2)
  })

  it('rejects more than 6 rows', () => {
    const rows = Array.from({ length: 7 }, () => commonItem())
    expect(() =>
      featureAlternatingV1Schema.parse({
        templateKey: 'feature_alternating_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          rows,
        },
      })
    ).toThrow()
  })

  it('rejects items missing icon / heading / description', () => {
    // The old `imageSide` field is gone; old-shape items are no longer valid.
    expect(() =>
      featureAlternatingV1Schema.parse({
        templateKey: 'feature_alternating_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          rows: [
            { title: 't', body: 'b', image: { publicId: 'x', alt: 'x' }, imageSide: 'left' },
          ],
        },
      })
    ).toThrow()
  })
})
