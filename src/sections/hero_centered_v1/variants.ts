export const defaultVariant = 'default'
export const variants = ['default', 'dark'] as const
export type HeroCenteredV1Variant = (typeof variants)[number]
