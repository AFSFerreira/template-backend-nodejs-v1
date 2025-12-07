import { CORS_MAX_AGE } from '@constants/timing-constants'
import { env } from '@env/index'
import type { FastifyCorsOptions } from '@fastify/cors'

export const corsConfiguration = {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
  maxAge: CORS_MAX_AGE, // Cache de 2 horas
} satisfies FastifyCorsOptions
