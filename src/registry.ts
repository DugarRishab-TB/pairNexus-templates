import { z } from 'zod'
import * as navV1 from './sections/nav_v1/index.js'
import * as heroCenteredV1 from './sections/hero_centered_v1/index.js'
import * as heroSearchV1 from './sections/hero_search_v1/index.js'
import * as trustLogosV1 from './sections/trust_logos_v1/index.js'
import * as featureSplitV1 from './sections/feature_split_v1/index.js'
import * as stepperFeatureV1 from './sections/stepper_feature_v1/index.js'
import * as featureGrid2x2V1 from './sections/feature_grid_2x2_v1/index.js'
import * as featureAlternatingV1 from './sections/feature_alternating_v1/index.js'
import * as tabbedFeaturesV1 from './sections/tabbed_features_v1/index.js'
import * as voiceAiCardsV1 from './sections/voice_ai_cards_v1/index.js'
import * as statsWithVideoV1 from './sections/stats_with_video_v1/index.js'
import * as securityIllustrationV1 from './sections/security_illustration_v1/index.js'
import * as testimonialsV1 from './sections/testimonials_v1/index.js'
import * as faqV1 from './sections/faq_v1/index.js'
import * as blogGridV1 from './sections/blog_grid_v1/index.js'
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
  [heroSearchV1.templateKey]: {
    templateKey: heroSearchV1.templateKey,
    schema: heroSearchV1.heroSearchV1Schema,
    defaultVariant: heroSearchV1.defaultVariant,
    variants: heroSearchV1.variants,
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
  [voiceAiCardsV1.templateKey]: {
    templateKey: voiceAiCardsV1.templateKey,
    schema: voiceAiCardsV1.voiceAiCardsV1Schema,
    defaultVariant: voiceAiCardsV1.defaultVariant,
    variants: voiceAiCardsV1.variants,
  },
  [statsWithVideoV1.templateKey]: {
    templateKey: statsWithVideoV1.templateKey,
    schema: statsWithVideoV1.statsWithVideoV1Schema,
    defaultVariant: statsWithVideoV1.defaultVariant,
    variants: statsWithVideoV1.variants,
  },
  [securityIllustrationV1.templateKey]: {
    templateKey: securityIllustrationV1.templateKey,
    schema: securityIllustrationV1.securityIllustrationV1Schema,
    defaultVariant: securityIllustrationV1.defaultVariant,
    variants: securityIllustrationV1.variants,
  },
  [testimonialsV1.templateKey]: {
    templateKey: testimonialsV1.templateKey,
    schema: testimonialsV1.testimonialsV1Schema,
    defaultVariant: testimonialsV1.defaultVariant,
    variants: testimonialsV1.variants,
  },
  [faqV1.templateKey]: {
    templateKey: faqV1.templateKey,
    schema: faqV1.faqV1Schema,
    defaultVariant: faqV1.defaultVariant,
    variants: faqV1.variants,
  },
  [blogGridV1.templateKey]: {
    templateKey: blogGridV1.templateKey,
    schema: blogGridV1.blogGridV1Schema,
    defaultVariant: blogGridV1.defaultVariant,
    variants: blogGridV1.variants,
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
  heroSearchV1.heroSearchV1Schema,
  trustLogosV1.trustLogosV1Schema,
  featureSplitV1.featureSplitV1Schema,
  stepperFeatureV1.stepperFeatureV1Schema,
  featureGrid2x2V1.featureGrid2x2V1Schema,
  featureAlternatingV1.featureAlternatingV1Schema,
  tabbedFeaturesV1.tabbedFeaturesV1Schema,
  voiceAiCardsV1.voiceAiCardsV1Schema,
  statsWithVideoV1.statsWithVideoV1Schema,
  securityIllustrationV1.securityIllustrationV1Schema,
  testimonialsV1.testimonialsV1Schema,
  faqV1.faqV1Schema,
  blogGridV1.blogGridV1Schema,
  footerV1.footerV1Schema,
])

export type AnySection = z.infer<typeof anySectionSchema>
