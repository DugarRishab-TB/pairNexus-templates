export const defaultVariant = 'default'
export const variants = ['default', 'reversed'] as const
export type FeatureSplitV1Variant = (typeof variants)[number]
