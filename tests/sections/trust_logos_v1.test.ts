import { describe, it, expect } from 'vitest'
import { trustLogosV1Schema } from '../../src/sections/trust_logos_v1/schema.js'

describe('trustLogosV1Schema', () => {
  it('accepts up to 12 logos', () => {
    const logos = Array.from({ length: 12 }, (_, i) => ({
      type: 'image' as const,
      data: { publicId: `logos/${i}`, alt: `Logo ${i}` },
    }))
    const result = trustLogosV1Schema.parse({
      templateKey: 'trust_logos_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'TRUSTED BY 2,500+ HOSPITALS' } },
        logos,
      },
    })
    expect(result.slots.logos).toHaveLength(12)
  })

  it('rejects more than 12 logos', () => {
    const logos = Array.from({ length: 13 }, (_, i) => ({
      type: 'image' as const,
      data: { publicId: `logos/${i}`, alt: `Logo ${i}` },
    }))
    expect(() =>
      trustLogosV1Schema.parse({
        templateKey: 'trust_logos_v1',
        slots: { eyebrow: { type: 'text', data: { text: 'x' } }, logos },
      })
    ).toThrow()
  })
})
