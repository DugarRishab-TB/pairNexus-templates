import { describe, it, expect } from 'vitest'
import { stepperFeatureV1Schema } from '../../src/sections/stepper_feature_v1/schema.js'
import { commonItem } from '../_helpers/common-item.js'

describe('stepperFeatureV1Schema', () => {
  it('accepts up to 6 steps', () => {
    const steps = Array.from({ length: 6 }, (_, i) =>
      commonItem({
        heading: `Step ${i + 1}`,
        description: { type: 'richtext', data: { html: `<p>Body ${i}</p>` } },
        extras: {
          subtitle: 'Sub',
          cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
        },
      }),
    )
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
    const steps = Array.from({ length: 7 }, () =>
      commonItem({
        extras: {
          subtitle: 'Sub',
          cta: { label: 'CTA', href: '/x', variant: 'primary' as const },
        },
      }),
    )
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
