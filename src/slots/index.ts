import { z } from 'zod'
import { textSlot } from './text.js'
import { richtextSlot } from './richtext.js'
import { imageSlot } from './image.js'
import { videoSlot } from './video.js'
import { ctaSlot } from './cta.js'
import { iconSlot } from './icon.js'
import { statsSlot } from './stats.js'
import { testimonialSlot } from './testimonial.js'
import { faqSlot } from './faq.js'
import { cardSlot } from './card.js'
import { badgeSlot } from './badge.js'
import { linkSlot } from './link.js'

export * from './text.js'
export * from './richtext.js'
export * from './image.js'
export * from './video.js'
export * from './cta.js'
export * from './icon.js'
export * from './stats.js'
export * from './testimonial.js'
export * from './faq.js'
export * from './card.js'
export * from './badge.js'
export * from './link.js'

export const slotSchema = z.discriminatedUnion('type', [
  textSlot,
  richtextSlot,
  imageSlot,
  videoSlot,
  ctaSlot,
  iconSlot,
  statsSlot,
  testimonialSlot,
  faqSlot,
  cardSlot,
  badgeSlot,
  linkSlot,
])

export type Slot = z.infer<typeof slotSchema>
export type SlotType = Slot['type']
