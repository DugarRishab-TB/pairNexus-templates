export const defaultVariant = 'default'
export const variants = ['default'] as const
export type HomeEditDocV1Variant = (typeof variants)[number]
