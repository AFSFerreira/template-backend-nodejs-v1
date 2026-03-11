import type { FastifyHelmetOptions } from '@fastify/helmet'

export const helmetConfiguration = {
  global: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  hidePoweredBy: true,
  noSniff: true,
  referrerPolicy: { policy: 'no-referrer' },
} as const satisfies FastifyHelmetOptions
