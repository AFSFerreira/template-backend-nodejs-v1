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
    aud: env.BACKEND_URL,
    iss: env.BACKEND_URL,
  },
  verify: {
    allowedAud: [env.BACKEND_URL],
    allowedIss: [env.BACKEND_URL],
  },
} as const satisfies FastifyJWTOptions
