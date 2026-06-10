import { describe, it, expect } from 'vitest'
import { stepperFeatureV1Schema } from '../../src/sections/stepper_feature_v1/schema.js'

describe('stepperFeatureV1Schema', () => {
  it('accepts up to 6 steps', () => {
    const steps = Array.from({ length: 6 }, (_, i) => ({
      title: `Step ${i + 1}`,
      subtitle: 'Sub',
      image: { publicId: `step-${i}`, alt: `Step ${i}` },
      body: `Body ${i}`,
      cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
    }))
    const result = stepperFeatureV1Schema.parse({
      templateKey: 'stepper_feature_v1',
      slots: {
        eyebrow: { type: 'text', data: { text: 'EYE' } },
        headline: { type: 'text', data: { text: 'HEAD' } },
        steps,
      },
    })
    expect(result.slots.steps).toHaveLength(6)
  })

  it('rejects more than 6 steps', () => {
    const steps = Array.from({ length: 7 }, (_, i) => ({
      title: `Step ${i + 1}`,
      subtitle: 'Sub',
      image: { publicId: `step-${i}`, alt: `Step ${i}` },
      body: `Body ${i}`,
      cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
    }))
    expect(() =>
      stepperFeatureV1Schema.parse({
        templateKey: 'stepper_feature_v1',
        slots: {
          eyebrow: { type: 'text', data: { text: 'x' } },
          headline: { type: 'text', data: { text: 'x' } },
          steps,
        },
      })
    ).toThrow()
  })
})
