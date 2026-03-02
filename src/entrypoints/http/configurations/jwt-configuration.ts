import type { FastifyJWTOptions } from '@fastify/jwt'
import { env } from '@env/index'

export const jwtConfiguration = {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_EXPIRATION,
    aud: env.FRONTEND_URL,
  },
  verify: {
    allowedAud: [env.FRONTEND_URL],
  },
} as const satisfies FastifyJWTOptions
