import { describe, it, expect } from 'vitest'
import { videoSlot } from '../../src/slots/video.js'

describe('videoSlot', () => {
  it('accepts a valid video slot', () => {
    const result = videoSlot.parse({
      type: 'video',
      data: { publicId: 'pairnexus/demo', alt: 'Demo video' },
    })
    expect(result.data.publicId).toBe('pairnexus/demo')
  })

  it('rejects empty publicId', () => {
    expect(() =>
      videoSlot.parse({ type: 'video', data: { publicId: '', alt: 'x' } })
    ).toThrow()
  })
})
