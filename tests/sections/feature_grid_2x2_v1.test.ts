import { describe, it, expect } from 'vitest'
import { featureGrid2x2V1Schema } from '../../src/sections/feature_grid_2x2_v1/schema.js'

describe('featureGrid2x2V1Schema', () => {
  it('accepts exactly 4 cards', () => {
    const cards = Array.from({ length: 4 }, (_, i) => ({
      title: `Card ${i}`,
      body: `Body ${i}`,
      decoration: { name: 'shield' as const },
    }))
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

  it('rejects more than 4 cards', () => {
    const cards = Array.from({ length: 5 }, (_, i) => ({
      title: `Card ${i}`,
      body: `Body ${i}`,
      decoration: { name: 'shield' as const },
    }))
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

  it('rejects fewer than 4 cards', () => {
    const cards = Array.from({ length: 3 }, (_, i) => ({
      title: `Card ${i}`,
      body: `Body ${i}`,
      decoration: { name: 'shield' as const },
    }))
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
