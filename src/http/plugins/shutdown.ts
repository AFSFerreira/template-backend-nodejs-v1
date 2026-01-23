import type { FastifyInstance } from 'fastify'
import { SENTRY_CLOSE_TIMEOUT } from '@constants/timing-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { prisma } from '@lib/prisma'
import { pool } from '@lib/prisma/helpers/configuration'
import { redis } from '@lib/redis'
import {
  DATABASE_SHUTDOWN,
  GRACEFUL_SHUTDOWN_ERROR,
  REDIS_SHUTDOWN,
  SENTRY_SHUTDOWN,
  STARTING_GRACEFUL_SHUTDOWN,
} from '@messages/loggings/system/server-loggings'
import * as Sentry from '@sentry/node'

export async function gracefulShutdown(_instance: FastifyInstance) {
  logger.info(STARTING_GRACEFUL_SHUTDOWN)

  await Promise.allSettled([
    prisma
      .$disconnect()
      .then(async () => {
        await pool.end()
      })
      .then(() => {
        logger.info(DATABASE_SHUTDOWN)
      })
      .catch((error: unknown) => {
        logError({
          error,
          message: `${GRACEFUL_SHUTDOWN_ERROR} [Postgres]`,
        })
      }),

    redis
      .quit()
      .then(() => {
        logger.info(REDIS_SHUTDOWN)
      })
      .catch((error: unknown) => {
        logError({
          error,
          message: `${GRACEFUL_SHUTDOWN_ERROR} [Redis]`,
        })
      }),

    Sentry.close(SENTRY_CLOSE_TIMEOUT)
      .then(() => {
        logger.info(SENTRY_SHUTDOWN)
      })
      .catch((error: unknown) => {
        logError({
          error,
          message: `${GRACEFUL_SHUTDOWN_ERROR} [Sentry]`,
        })
      }),
  ])
}
