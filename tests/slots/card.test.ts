import { describe, it, expect } from 'vitest'
import { cardSlot } from '../../src/slots/card.js'

describe('cardSlot', () => {
  it('accepts a card with all fields', () => {
    const result = cardSlot.parse({
      type: 'card',
      data: {
        title: 'Smart insights',
        body: 'Body text',
        image: { publicId: 'x', alt: 'alt' },
        cta: { label: 'Learn more', href: '/learn', variant: 'primary' },
      },
    })
    expect(result.data.title).toBe('Smart insights')
  })

  it('accepts a card without optional image/cta', () => {
    const result = cardSlot.parse({
      type: 'card',
      data: { title: 'x', body: 'y' },
    })
    expect(result.data.image).toBeUndefined()
    expect(result.data.cta).toBeUndefined()
  })
})
