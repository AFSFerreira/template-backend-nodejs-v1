import ms from 'ms'
import { z } from 'zod'
import { BASE64_REGEX, TOKEN_DURATION_REGEX } from '../constants/regex-constants'

const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error', 'trace']).default('info'),

  // App:
  APP_NAME: z.string().trim().nonempty().default('Template Backend'),
  APP_PORT: z.coerce.number().default(3333),

  // JWT Token setup:
  JWT_SECRET: z.string().trim().min(60, 'JWT secret must be at least 60 characters long'),
  JWT_EXPIRATION: z.string().trim().nonempty().regex(TOKEN_DURATION_REGEX).default('2h'),
  JWT_REFRESH_EXPIRATION: z.string().trim().nonempty().regex(TOKEN_DURATION_REGEX).default('7d'),

  ENCRYPTION_KEY: z.string().trim().length(44).regex(BASE64_REGEX, 'O conteúdo da string deve ser em base64'),
  BLIND_INDEX_SECRET: z.string().trim().length(44).regex(BASE64_REGEX, 'O conteúdo da string deve ser em base64'),

  // Argon2 Configuration:
  ARGON_MEMORY_COST: z.coerce.number().min(4096).max(262144),
  ARGON_TIME_COST: z.coerce.number().min(1).max(10),
  ARGON_PARALLELISM: z.coerce.number().min(1).max(8),
  ARGON_SECRET: z.string().trim().nonempty().min(32).max(64),

  // Sentry:
  SENTRY_DSN: z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value
    }

    const trimmedValue = value.trim()
    return trimmedValue === '' ? undefined : trimmedValue
  }, z.url().optional()),
  SENTRY_RELEASE: z.string().trim().nonempty().default('dev-local'),

  // Memory:
  MAX_RAM_MB: z.coerce.number().int().positive().min(512),

  // Database:
  DATABASE_URL: z.url().trim().nonempty(),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_POOL_MIN: z.coerce.number().int().positive().default(2),
  DB_CONNECTION_TIMEOUT: z.coerce.number().int().positive().default(ms('10s')),
  DB_IDLE_TIMEOUT: z.coerce.number().int().positive().default(ms('30s')),

  // Redis:
  REDIS_HOST: z.string().trim().nonempty(),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().trim().nonempty(),
  REDIS_DB: z.coerce.number().int().nonnegative().default(0),

  // URLs de Conexão:
  FRONTEND_URL: z.url().trim().nonempty().default('http://localhost:5173'),
  BACKEND_URL: z.url().trim().nonempty().default('http://localhost:3000'),

  // Rate Limiting (per minute):
  RATE_LIMIT_STANDARD_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_AUTH_MAX: z.coerce.number().int().positive().default(10),
  RATE_LIMIT_MUTATION_MAX: z.coerce.number().int().positive().default(30),
  RATE_LIMIT_HEAVY_MAX: z.coerce.number().int().positive().default(10),
  RATE_LIMIT_CREATE_RESOURCE_MAX: z.coerce.number().int().positive().default(15),
  RATE_LIMIT_BULK_UPDATE_MAX: z.coerce.number().int().positive().default(60),

  // SMTP:
  SMTP_EMAIL: z.email(),
  SMTP_PASSWORD: z.string().trim().nonempty(),
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string().trim().nonempty(),
  SMTP_SECURE: z.enum(['true', 'false']).transform((data) => data === 'true'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  // eslint-disable-next-line no-console
  // biome-ignore lint/suspicious/noConsole: <Console necessário. Impossível utilizar pino aqui>
  console.error({
    message: '🚨 Invalid environment variables:',
    error: _env.error,
    context: z.treeifyError(_env.error),
  })
  throw new Error('Invalid environment variables! Please check your .env file or environment configuration.')
}

export const env = _env.data
