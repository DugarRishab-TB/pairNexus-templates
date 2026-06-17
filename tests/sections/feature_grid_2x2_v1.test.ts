import { describe, it, expect } from 'vitest'
import { featureGrid2x2V1Schema } from '../../src/sections/feature_grid_2x2_v1/schema.js'
import { lucideItem } from '../_helpers/common-item.js'

describe('featureGrid2x2V1Schema', () => {
  it('accepts exactly 4 cards', () => {
    const cards = Array.from({ length: 4 }, () => lucideItem('shield'))
    const result = featureGrid2x2V1Schema.parse({
      templateKey: 'feature_grid_2x2_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'EYE' } },
        headline: { type: 'text', data: { text: 'HEAD' } },
        cards,
      },
    })
    expect(result.slots.cards).toHaveLength(4)
  })

  it('rejects more than 6 cards', () => {
    const cards = Array.from({ length: 7 }, () => lucideItem('shield'))
    expect(() =>
      featureGrid2x2V1Schema.parse({
        templateKey: 'feature_grid_2x2_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          cards,
        },
      })
    ).toThrow()
  })

  it('rejects fewer than 2 cards', () => {
    const cards = [lucideItem('shield')]
    expect(() =>
      featureGrid2x2V1Schema.parse({
        templateKey: 'feature_grid_2x2_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          cards,
        },
      })
    ).toThrow()
  })
})
