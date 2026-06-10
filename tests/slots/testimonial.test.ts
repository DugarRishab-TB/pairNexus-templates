import { describe, it, expect } from 'vitest'
import { testimonialSlot } from '../../src/slots/testimonial.js'

describe('testimonialSlot', () => {
  it('accepts a valid testimonial with avatar', () => {
    const result = testimonialSlot.parse({
      type: 'testimonial',
      data: {
        quote: 'Reduced our admin time by 40%.',
        name: 'Dr. Mehta',
        role: 'CMO, City Hospital',
        avatar: { publicId: 'avatars/mehta', alt: 'Dr. Mehta' },
      },
    })
    expect(result.data.name).toBe('Dr. Mehta')
  })

  it('accepts a testimonial without avatar', () => {
    const result = testimonialSlot.parse({
      type: 'testimonial',
      data: {
        quote: 'Great product.',
        name: 'A. Person',
        role: 'Director',
      },
    })
    expect(result.data.avatar).toBeUndefined()
  })
})
