import { z } from 'zod'
import * as navV1 from './sections/nav_v1/index.js'
import * as heroCenteredV1 from './sections/hero_centered_v1/index.js'
import * as trustLogosV1 from './sections/trust_logos_v1/index.js'
import * as featureSplitV1 from './sections/feature_split_v1/index.js'
import * as stepperFeatureV1 from './sections/stepper_feature_v1/index.js'
import * as featureGrid2x2V1 from './sections/feature_grid_2x2_v1/index.js'
import * as featureAlternatingV1 from './sections/feature_alternating_v1/index.js'
import * as tabbedFeaturesV1 from './sections/tabbed_features_v1/index.js'
import * as footerV1 from './sections/footer_v1/index.js'

export interface SectionDefinition {
  templateKey: string
  schema: z.ZodTypeAny
  defaultVariant: string
  variants: readonly string[]
}

export const sectionRegistry: Record<string, SectionDefinition> = {
  [navV1.templateKey]: {
    templateKey: navV1.templateKey,
    schema: navV1.navV1Schema,
    defaultVariant: navV1.defaultVariant,
    variants: navV1.variants,
  },
  [heroCenteredV1.templateKey]: {
    templateKey: heroCenteredV1.templateKey,
    schema: heroCenteredV1.heroCenteredV1Schema,
    defaultVariant: heroCenteredV1.defaultVariant,
    variants: heroCenteredV1.variants,
  },
  [trustLogosV1.templateKey]: {
    templateKey: trustLogosV1.templateKey,
    schema: trustLogosV1.trustLogosV1Schema,
    defaultVariant: trustLogosV1.defaultVariant,
    variants: trustLogosV1.variants,
  },
  [featureSplitV1.templateKey]: {
    templateKey: featureSplitV1.templateKey,
    schema: featureSplitV1.featureSplitV1Schema,
    defaultVariant: featureSplitV1.defaultVariant,
    variants: featureSplitV1.variants,
  },
  [stepperFeatureV1.templateKey]: {
    templateKey: stepperFeatureV1.templateKey,
    schema: stepperFeatureV1.stepperFeatureV1Schema,
    defaultVariant: stepperFeatureV1.defaultVariant,
    variants: stepperFeatureV1.variants,
  },
  [featureGrid2x2V1.templateKey]: {
    templateKey: featureGrid2x2V1.templateKey,
    schema: featureGrid2x2V1.featureGrid2x2V1Schema,
    defaultVariant: featureGrid2x2V1.defaultVariant,
    variants: featureGrid2x2V1.variants,
  },
  [featureAlternatingV1.templateKey]: {
    templateKey: featureAlternatingV1.templateKey,
    schema: featureAlternatingV1.featureAlternatingV1Schema,
    defaultVariant: featureAlternatingV1.defaultVariant,
    variants: featureAlternatingV1.variants,
  },
  [tabbedFeaturesV1.templateKey]: {
    templateKey: tabbedFeaturesV1.templateKey,
    schema: tabbedFeaturesV1.tabbedFeaturesV1Schema,
    defaultVariant: tabbedFeaturesV1.defaultVariant,
    variants: tabbedFeaturesV1.variants,
  },
  [footerV1.templateKey]: {
    templateKey: footerV1.templateKey,
    schema: footerV1.footerV1Schema,
    defaultVariant: footerV1.defaultVariant,
    variants: footerV1.variants,
  },
}

export const TEMPLATE_KEYS = Object.keys(sectionRegistry) as TemplateKey[]

export type TemplateKey = keyof typeof sectionRegistry

export function isValidTemplateKey(key: string): key is TemplateKey {
  return key in sectionRegistry
}

export function getSectionDefinition(key: string): SectionDefinition | undefined {
  return sectionRegistry[key]
}

/**
 * The discriminated union of all section schemas, used to validate
 * any section document regardless of which template it uses.
 */
export const anySectionSchema = z.discriminatedUnion('templateKey', [
  navV1.navV1Schema,
  heroCenteredV1.heroCenteredV1Schema,
  trustLogosV1.trustLogosV1Schema,
  featureSplitV1.featureSplitV1Schema,
  stepperFeatureV1.stepperFeatureV1Schema,
  featureGrid2x2V1.featureGrid2x2V1Schema,
  featureAlternatingV1.featureAlternatingV1Schema,
  tabbedFeaturesV1.tabbedFeaturesV1Schema,
  footerV1.footerV1Schema,
])

export type AnySection = z.infer<typeof anySectionSchema>
