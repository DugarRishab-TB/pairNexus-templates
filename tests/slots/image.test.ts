import { describe, it, expect } from 'vitest'
import { imageSlot } from '../../src/slots/image.js'

describe('imageSlot', () => {
  it('accepts a valid image slot', () => {
    const result = imageSlot.parse({
      type: 'image',
      data: { publicId: 'pairnexus/hero', alt: 'Doctor portrait' },
    })
    expect(result.data.publicId).toBe('pairnexus/hero')
    expect(result.data.alt).toBe('Doctor portrait')
  })

  it('rejects missing publicId', () => {
    expect(() =>
      imageSlot.parse({ type: 'image', data: { alt: 'x' } } as never)
    ).toThrow()
  })

  it('rejects empty alt', () => {
    expect(() =>
      imageSlot.parse({ type: 'image', data: { publicId: 'x', alt: '' } })
    ).toThrow()
  })

  it('rejects alt longer than 500 chars', () => {
    expect(() =>
      imageSlot.parse({
        type: 'image',
        data: { publicId: 'x', alt: 'a'.repeat(501) },
      })
    ).toThrow()
  })
})
