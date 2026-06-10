import { describe, it, expect } from 'vitest'
import { badgeSlot } from '../../src/slots/badge.js'

describe('badgeSlot', () => {
  it('accepts a badge with label and variant', () => {
    const result = badgeSlot.parse({
      type: 'badge',
      data: { label: 'New', variant: 'success' },
    })
    expect(result.data.variant).toBe('success')
  })

  it('rejects unknown variant', () => {
    expect(() =>
      badgeSlot.parse({ type: 'badge', data: { label: 'x', variant: 'rainbow' } } as never)
    ).toThrow()
  })

  it('rejects empty label', () => {
    expect(() =>
      badgeSlot.parse({ type: 'badge', data: { label: '', variant: 'info' } })
    ).toThrow()
  })
})
