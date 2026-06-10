export const defaultVariant = 'default'
export const variants = ['default', 'dark'] as const
export type FooterV1Variant = (typeof variants)[number]
