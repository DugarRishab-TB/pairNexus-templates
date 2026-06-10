import { describe, it, expect } from 'vitest'
import { ctaSlot } from '../../src/slots/cta.js'

describe('ctaSlot', () => {
  it('accepts a primary cta', () => {
    const result = ctaSlot.parse({
      type: 'cta',
      data: { label: 'Get in touch', href: '/contact', variant: 'primary' },
    })
    expect(result.data.variant).toBe('primary')
  })

  it('accepts a secondary cta with external href', () => {
    const result = ctaSlot.parse({
      type: 'cta',
      data: { label: 'Watch demo', href: 'https://youtube.com/...', variant: 'secondary' },
    })
    expect(result.data.variant).toBe('secondary')
  })

  it('rejects unknown variant', () => {
    expect(() =>
      ctaSlot.parse({
        type: 'cta',
        data: { label: 'x', href: 'y', variant: 'rainbow' },
      } as never)
    ).toThrow()
  })

  it('rejects empty label', () => {
    expect(() =>
      ctaSlot.parse({ type: 'cta', data: { label: '', href: 'y', variant: 'primary' } })
    ).toThrow()
  })

  it('rejects empty href', () => {
    expect(() =>
      ctaSlot.parse({ type: 'cta', data: { label: 'x', href: '', variant: 'primary' } })
    ).toThrow()
  })
})
