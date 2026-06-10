import { describe, it, expect } from 'vitest'
import { linkSlot } from '../../src/slots/link.js'

describe('linkSlot', () => {
  it('accepts a link', () => {
    const result = linkSlot.parse({
      type: 'link',
      data: { label: 'About', href: '/about' },
    })
    expect(result.data.href).toBe('/about')
  })

  it('rejects empty label', () => {
    expect(() =>
      linkSlot.parse({ type: 'link', data: { label: '', href: '/x' } })
    ).toThrow()
  })

  it('rejects empty href', () => {
    expect(() =>
      linkSlot.parse({ type: 'link', data: { label: 'x', href: '' } })
    ).toThrow()
  })
})
