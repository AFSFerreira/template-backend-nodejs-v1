import { env } from '@env/index'
import type { FastifyCorsOptions } from '@fastify/cors'
import ms from 'ms'

export const corsConfig = {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
  maxAge: ms('2h') / 1000, // Cache de 2 horas
} satisfies FastifyCorsOptions
