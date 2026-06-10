import { describe, it, expect } from 'vitest'
import { navV1Schema } from '../../src/sections/nav_v1/schema.js'

describe('navV1Schema', () => {
  it('accepts a valid nav section', () => {
    const result = navV1Schema.parse({
      templateKey: 'nav_v1',
      slots: {
        logo: { type: 'image', data: { publicId: 'logos/pairnexus', alt: 'PairNexus logo' } },
        links: {
          type: 'link',
          data: { label: 'About', href: '/about' },
        },
        cta: {
          type: 'cta',
          data: { label: 'Get in touch', href: '/contact', variant: 'primary' },
        },
      },
    })
    expect(result.templateKey).toBe('nav_v1')
  })

  it('rejects wrong templateKey', () => {
    expect(() =>
      navV1Schema.parse({
        templateKey: 'hero_v1',
        slots: {},
      } as never)
    ).toThrow()
  })
})
