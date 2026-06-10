import { describe, it, expect } from 'vitest'
import { richtextSlot } from '../../src/slots/richtext.js'

describe('richtextSlot', () => {
  it('accepts a valid richtext slot', () => {
    const result = richtextSlot.parse({
      type: 'richtext',
      data: { html: '<p>Hello</p>' },
    })
    expect(result.data.html).toBe('<p>Hello</p>')
  })

  it('rejects empty html', () => {
    expect(() =>
      richtextSlot.parse({ type: 'richtext', data: { html: '' } })
    ).toThrow()
  })

  it('rejects html longer than 20000 chars', () => {
    expect(() =>
      richtextSlot.parse({ type: 'richtext', data: { html: 'a'.repeat(20001) } })
    ).toThrow()
  })
})
