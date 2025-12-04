import { env } from '@env/index'
import type { RedisOptions } from 'ioredis'

export const redisConnection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
  password: env.REDIS_PASSWORD,
} satisfies RedisOptions
