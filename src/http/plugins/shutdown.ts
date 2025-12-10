import type { FastifyInstance } from 'fastify'
import { REDIS_STARTED_STATUS } from '@constants/arrays'
import { SENTRY_CLOSE_TIMEOUT } from '@constants/timing-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { pool } from '@lib/prisma/helpers/configuration'
import { redis } from '@lib/redis'
import {
  DATABASE_SHUTDOWN,
  GRACEFUL_SHUTDOWN_ERROR,
  REDIS_SHUTDOWN,
  SENTRY_SHUTDOWN,
  STARTING_GRACEFUL_SHUTDOWN,
} from '@messages/loggings/server-loggings'
import * as Sentry from '@sentry/node'

export async function gracefulShutdown(_instance: FastifyInstance) {
  logger.info(STARTING_GRACEFUL_SHUTDOWN)

  const results = await Promise.allSettled([
    (async () => {
      await pool.end()
      logger.info(DATABASE_SHUTDOWN)
    })(),

    (async () => {
      if (REDIS_STARTED_STATUS.includes(redis.status)) {
        await redis.quit()
        logger.info(REDIS_SHUTDOWN)
      }
    })(),

    (async () => {
      await Sentry.close(SENTRY_CLOSE_TIMEOUT)
      logger.info(SENTRY_SHUTDOWN)
    })(),
  ])

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      const resources = ['Postgres', 'Redis', 'Sentry']

      logError({
        error: result.reason,
        message: `${GRACEFUL_SHUTDOWN_ERROR} [${resources[index]}]`,
      })
    }
  })
}
