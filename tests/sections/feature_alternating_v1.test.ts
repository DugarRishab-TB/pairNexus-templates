import { describe, it, expect } from 'vitest'
import { featureAlternatingV1Schema } from '../../src/sections/feature_alternating_v1/schema.js'

describe('featureAlternatingV1Schema', () => {
  it('accepts 2 alternating rows', () => {
    const rows = [
      {
        title: 'Time-Saving Workflow',
        body: 'Streamline daily clinical operations...',
        image: { publicId: 'alt/1', alt: 'Tablet' },
        imageSide: 'left' as const,
      },
      {
        title: 'Error Reduction',
        body: 'Leverage intelligent automation...',
        image: { publicId: 'alt/2', alt: 'Phone' },
        imageSide: 'right' as const,
      },
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
    const rows = Array.from({ length: 7 }, (_, i) => ({
      title: `R${i}`,
      body: `B${i}`,
      image: { publicId: `x${i}`, alt: 'x' },
      imageSide: 'left' as const,
    }))
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

  it('rejects invalid imageSide', () => {
    expect(() =>
      featureAlternatingV1Schema.parse({
        templateKey: 'feature_alternating_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          rows: [
            {
              title: 't',
              body: 'b',
              image: { publicId: 'x', alt: 'x' },
              imageSide: 'middle' as never,
            },
          ],
        },
      })
    ).toThrow()
  })
})
