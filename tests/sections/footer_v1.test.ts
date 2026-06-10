import { describe, it, expect } from 'vitest'
import { footerV1Schema } from '../../src/sections/footer_v1/schema.js'

describe('footerV1Schema', () => {
  it('accepts a footer with 3 columns and copyright', () => {
    const result = footerV1Schema.parse({
      templateKey: 'footer_v1',
      slots: {
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
            ],
          },
          {
            title: 'Company',
            links: [{ label: 'About', href: '/about' }],
          },
          {
            title: 'Resources',
            links: [{ label: 'Blog', href: '/blog' }],
          },
        ],
        copyright: { type: 'text', data: { text: '© 2026 PairNexus' } },
      },
    })
    expect(result.slots.columns).toHaveLength(3)
  })

  it('rejects more than 6 columns', () => {
    const columns = Array.from({ length: 7 }, (_, i) => ({
      title: `C${i}`,
      links: [],
    }))
    expect(() =>
      footerV1Schema.parse({
        templateKey: 'footer_v1',
        slots: {
          columns,
          copyright: { type: 'text', data: { text: 'x' } },
        },
      })
    ).toThrow()
  })
})
