import { describe, it, expect } from 'vitest'
import { heroCenteredV1Schema } from '../../src/sections/hero_centered_v1/schema.js'

describe('heroCenteredV1Schema', () => {
  it('accepts a full hero with stats', () => {
    const result = heroCenteredV1Schema.parse({
      templateKey: 'hero_centered_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'AI-POWERED' } },
        headline: { type: 'text', data: { text: 'HEALTHCARE OPERATIONS PLATFORM' } },
        body: { type: 'richtext', data: { html: '<p>...</p>' } },
        primaryCta: {
          type: 'cta',
          data: { label: 'Talk to Sales', href: '/contact', variant: 'primary' },
        },
        secondaryCta: {
          type: 'cta',
          data: { label: 'Watch Tour', href: '/tour', variant: 'secondary' },
        },
        backgroundImage: {
          type: 'image',
          data: { publicId: 'hero/bg', alt: 'Background' },
        },
        stats: {
          type: 'stats',
          data: {
            items: [
              { value: '2.4M+', label: 'Records', icon: { name: 'shield' } },
            ],
          },
        },
      },
    })
    expect(result.templateKey).toBe('hero_centered_v1')
  })

  it('rejects wrong templateKey', () => {
    expect(() =>
      heroCenteredV1Schema.parse({ templateKey: 'nav_v1', slots: {} } as never)
    ).toThrow()
  })
})
