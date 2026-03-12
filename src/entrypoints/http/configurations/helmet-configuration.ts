import type { FastifyHelmetOptions } from '@fastify/helmet'
import { env } from '@env/index'

export const helmetConfiguration = {
  global: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  hidePoweredBy: true,
  noSniff: true,
  referrerPolicy: { policy: 'no-referrer' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'none'"],
      frameAncestors: ["'self'", env.FRONTEND_URL],
      imgSrc: ["'self'", 'data:', 'https:', env.FRONTEND_URL],
    },
  },
} as const satisfies FastifyHelmetOptions
