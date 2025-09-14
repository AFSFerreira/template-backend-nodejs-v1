import { z } from 'zod'
import { TOKEN_DURATION_REGEX } from '../constants/regex'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error', 'trace']).default('info'),

  // App:
  APP_NAME: z.string().trim().nonempty().default('SBAstrobio'),
  APP_PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().trim().min(60, 'JWT secret must be at least 60 characters long'),
  HASH_SALT_ROUNDS: z.coerce.number().min(6).max(16).default(12),
  JWT_EXPIRATION: z.string().trim().nonempty().regex(TOKEN_DURATION_REGEX).default('2h'),
  JWT_REFRESH_EXPIRATION: z.string().trim().nonempty().regex(TOKEN_DURATION_REGEX).default('7d'),

  // URLs de Conexão:
  FRONTEND_URL: z.string().trim().nonempty().default('http://localhost:5173'),

  // SMTP:
  SMTP_EMAIL: z.email(),
  SMTP_PASSWORD: z.string().trim().nonempty(),
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string().trim().nonempty(),
  SMTP_SECURE: z.coerce.boolean(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  // eslint-disable-next-line no-console
  console.error('🚨 Invalid environment variables:', _env.error)

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
