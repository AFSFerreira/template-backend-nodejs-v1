import { env } from '@env/index'
import type { FastifyJWTOptions } from '@fastify/jwt'

export const jwtConfig = {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_EXPIRATION,
  },
} satisfies FastifyJWTOptions
