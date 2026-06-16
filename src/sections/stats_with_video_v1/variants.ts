export const defaultVariant = 'default'
export const variants = ['default'] as const
export type StatsWithVideoV1Variant = (typeof variants)[number]
