export const defaultVariant = 'default'
export const variants = ['default'] as const
export type VoiceAiCardsV1Variant = (typeof variants)[number]
