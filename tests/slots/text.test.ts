import { describe, it, expect } from 'vitest'
import { textSlot } from '../../src/slots/text.js'

describe('textSlot', () => {
  it('accepts a valid text slot', () => {
    const result = textSlot.parse({
      type: 'text',
      data: { text: 'Hello world' },
    })
    expect(result.data.text).toBe('Hello world')
  })

  it('rejects empty text', () => {
    expect(() =>
      textSlot.parse({ type: 'text', data: { text: '' } })
    ).toThrow()
  })

  it('rejects text longer than 500 chars', () => {
    expect(() =>
      textSlot.parse({ type: 'text', data: { text: 'a'.repeat(501) } })
    ).toThrow()
  })

  it('rejects wrong type literal', () => {
    expect(() =>
      textSlot.parse({ type: 'richtext', data: { text: 'x' } } as never)
    ).toThrow()
  })
})
