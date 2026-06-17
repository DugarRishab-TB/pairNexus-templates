import { describe, it, expect } from 'vitest'
import {
  sectionRegistry,
  isValidTemplateKey,
  anySectionSchema,
  TEMPLATE_KEYS,
} from '../src/registry.js'

describe('sectionRegistry', () => {
  it('contains all 16 v1 templates', () => {
    expect(TEMPLATE_KEYS).toHaveLength(16)
    expect(TEMPLATE_KEYS).toEqual(
      expect.arrayContaining([
        'nav_v1',
        'hero_centered_v1',
        'hero_search_v1',
        'trust_logos_v1',
        'feature_split_v1',
        'stepper_feature_v1',
        'feature_grid_2x2_v1',
        'feature_alternating_v1',
        'tabbed_features_v1',
        'voice_ai_cards_v1',
        'stats_with_video_v1',
        'security_illustration_v1',
        'testimonials_v1',
        'faq_v1',
        'blog_grid_v1',
        'footer_v1',
      ])
    )
  })

  it('isValidTemplateKey returns true for known keys', () => {
    expect(isValidTemplateKey('hero_centered_v1')).toBe(true)
  })

  it('isValidTemplateKey returns false for unknown keys', () => {
    expect(isValidTemplateKey('hero_v9000')).toBe(false)
  })

  it('validates a hero section through the union', () => {
    const result = anySectionSchema.safeParse({
      templateKey: 'hero_centered_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'x' } },
        headline: { type: 'text', data: { text: 'y' } },
        body: { type: 'richtext', data: { html: '<p>z</p>' } },
        primaryCta: { type: 'cta', data: { label: 'L', href: '/h', variant: 'primary' } },
        secondaryCta: { type: 'cta', data: { label: 'L', href: '/h', variant: 'secondary' } },
        backgroundImage: { type: 'image', data: { publicId: 'p', alt: 'a' } },
        stats: { type: 'stats', data: { items: [{ value: '1', label: 'l', icon: { name: 'shield' } }] } },
      },
    })
    expect(result.success).toBe(true)
  })

  it('rejects an unknown templateKey through the union', () => {
    const result = anySectionSchema.safeParse({
      templateKey: 'unicorn_v1',
      slots: {},
    })
    expect(result.success).toBe(false)
  })

  it('every registry entry has at least one variant', () => {
    for (const def of Object.values(sectionRegistry)) {
      expect(def.variants.length).toBeGreaterThan(0)
    }
  })
})
