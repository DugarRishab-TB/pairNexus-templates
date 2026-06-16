export const defaultVariant = 'default'
export const variants = ['default', 'dark'] as const
export type HeroSearchV1Variant = (typeof variants)[number]
