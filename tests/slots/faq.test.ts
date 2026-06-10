import { describe, it, expect } from 'vitest'
import { faqSlot } from '../../src/slots/faq.js'

describe('faqSlot', () => {
  it('accepts up to 20 entries', () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      q: `Q${i}`,
      a: `A${i}`,
    }))
    const result = faqSlot.parse({ type: 'faq', data: { items } })
    expect(result.data.items).toHaveLength(20)
  })

  it('rejects more than 20 entries', () => {
    const items = Array.from({ length: 21 }, (_, i) => ({
      q: `Q${i}`,
      a: `A${i}`,
    }))
    expect(() => faqSlot.parse({ type: 'faq', data: { items } })).toThrow()
  })

  it('rejects empty q or a', () => {
    expect(() =>
      faqSlot.parse({ type: 'faq', data: { items: [{ q: '', a: 'x' }] } })
    ).toThrow()
    expect(() =>
      faqSlot.parse({ type: 'faq', data: { items: [{ q: 'x', a: '' }] } })
    ).toThrow()
  })
})
