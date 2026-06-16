export const defaultVariant = 'default'
export const variants = ['default'] as const
export type BlogGridV1Variant = (typeof variants)[number]
