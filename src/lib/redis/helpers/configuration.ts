import type { RedisOptions } from 'ioredis'
import { env } from '@env/index'

export const redisConnection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
  password: env.REDIS_PASSWORD,
} as const satisfies RedisOptions
