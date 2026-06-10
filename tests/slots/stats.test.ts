import { describe, it, expect } from 'vitest'
import { statsSlot } from '../../src/slots/stats.js'

describe('statsSlot', () => {
  it('accepts up to 4 stats', () => {
    const result = statsSlot.parse({
      type: 'stats',
      data: {
        items: [
          { value: '2.4M+', label: 'Records Transcribed', icon: { name: 'shield' } },
          { value: '98%', label: 'Accuracy', icon: { name: 'check' } },
          { value: '120+', label: 'Providers', icon: { name: 'users' } },
          { value: '30%', label: 'Efficiency', icon: { name: 'sparkles' } },
        ],
      },
    })
    expect(result.data.items).toHaveLength(4)
  })

  it('rejects more than 4 stats', () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      value: String(i),
      label: 'x',
      icon: { name: 'shield' },
    }))
    expect(() => statsSlot.parse({ type: 'stats', data: { items } })).toThrow()
  })

  it('rejects empty items array', () => {
    expect(() =>
      statsSlot.parse({ type: 'stats', data: { items: [] } })
    ).toThrow()
  })
})
