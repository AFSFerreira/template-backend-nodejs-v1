import type { FastifyCorsOptions } from '@fastify/cors'
import { CORS_MAX_AGE } from '@constants/timing-constants'
import { env } from '@env/index'

export const corsConfiguration = {
  origin: [env.FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization', 'Content-Type', 'Content-Disposition'],
  maxAge: CORS_MAX_AGE, // Cache de 2 horas
} as const satisfies FastifyCorsOptions
