import { env } from '@env/index'
import { PrismaPg } from '@prisma/adapter-pg'

export const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
  max: env.DB_POOL_MAX,
  min: env.DB_POOL_MIN,
  connectionTimeoutMillis: env.DB_CONNECTION_TIMEOUT,
  idleTimeoutMillis: env.DB_IDLE_TIMEOUT,
})
