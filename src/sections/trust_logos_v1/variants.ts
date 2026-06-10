export const defaultVariant = 'default'
export const variants = ['default'] as const
export type TrustLogosV1Variant = (typeof variants)[number]
