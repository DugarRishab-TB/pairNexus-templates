import { describe, it, expect } from 'vitest'
import { slotSchema } from '../../src/slots/index.js'

describe('slotSchema (discriminated union)', () => {
  it('parses a text slot', () => {
    const result = slotSchema.parse({ type: 'text', data: { text: 'x' } })
    expect(result.type).toBe('text')
  })

  it('parses a stats slot', () => {
    const result = slotSchema.parse({
      type: 'stats',
      data: { items: [{ value: '1', label: 'l', icon: { name: 'shield' } }] },
    })
    expect(result.type).toBe('stats')
  })

  it('rejects an unknown slot type', () => {
    expect(() =>
      slotSchema.parse({ type: 'nonsense', data: {} } as never)
    ).toThrow()
  })
})
