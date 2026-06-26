import { z } from 'zod'

export const ColorSchema = z.union([
  z.literal('gray'),
  z.literal('gold'),
  z.literal('bronze'),
  z.literal('brown'),
  z.literal('yellow'),
  z.literal('amber'),
  z.literal('orange'),
  z.literal('tomato'),
  z.literal('red'),
  z.literal('ruby'),
  z.literal('crimson'),
  z.literal('pink'),
  z.literal('plum'),
  z.literal('purple'),
  z.literal('violet'),
  z.literal('iris'),
  z.literal('indigo'),
  z.literal('blue'),
  z.literal('cyan'),
  z.literal('teal'),
  z.literal('jade'),
  z.literal('green'),
  z.literal('grass'),
  z.literal('lime'),
  z.literal('mint'),
  z.literal('sky'),
])

/**
 * Derived from {@link ColorSchema} so the type and the runtime validator
 * can never drift apart.
 */
export type Color = z.infer<typeof ColorSchema>
