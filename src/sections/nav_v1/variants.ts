export const defaultVariant = 'default'
export const variants = ['default'] as const
export type NavV1Variant = (typeof variants)[number]
