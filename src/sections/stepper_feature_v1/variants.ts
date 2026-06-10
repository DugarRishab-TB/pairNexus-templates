export const defaultVariant = 'default'
export const variants = ['default'] as const
export type StepperFeatureV1Variant = (typeof variants)[number]
