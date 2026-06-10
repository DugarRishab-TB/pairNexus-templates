export const defaultVariant = 'default'
export const variants = ['default'] as const
export type FeatureAlternatingV1Variant = (typeof variants)[number]
