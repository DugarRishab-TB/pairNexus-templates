export const defaultVariant = 'default'
export const variants = ['default'] as const
export type TabbedFeaturesV1Variant = (typeof variants)[number]
