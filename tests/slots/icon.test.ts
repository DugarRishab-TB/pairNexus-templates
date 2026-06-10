import { describe, it, expect } from 'vitest'
import { iconSlot } from '../../src/slots/icon.js'

describe('iconSlot', () => {
  it('accepts a known icon name', () => {
    const result = iconSlot.parse({
      type: 'icon',
      data: { name: 'shield' },
    })
    expect(result.data.name).toBe('shield')
  })

  it('rejects unknown icon name', () => {
    expect(() =>
      iconSlot.parse({ type: 'icon', data: { name: 'unicorn' } } as never)
    ).toThrow()
  })
})
