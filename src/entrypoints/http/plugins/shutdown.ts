import type { FastifyInstance } from 'fastify'
import { SENTRY_CLOSE_TIMEOUT } from '@constants/timing-constants'
import { applicationScheduler, applicationWorkerManager } from '@lib/bullmq'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { prisma } from '@lib/prisma'
import { redis } from '@lib/redis'
import {
  CRON_SHUTDOWN,
  DATABASE_SHUTDOWN,
  GRACEFUL_SHUTDOWN_ERROR,
  REDIS_SHUTDOWN,
  SENTRY_SHUTDOWN,
  STARTING_GRACEFUL_SHUTDOWN,
  WORKERS_SHUTDOWN,
} from '@messages/loggings/system/server-loggings'
import * as Sentry from '@sentry/node'

export async function gracefulShutdown(_instance: FastifyInstance) {
  logger.info(STARTING_GRACEFUL_SHUTDOWN)

  // 1. Para de agendar novos jobs no BullMQ
  try {
    await applicationScheduler.stopAll()
    logger.info(CRON_SHUTDOWN)
  } catch (error: unknown) {
    logError({ error, message: `${GRACEFUL_SHUTDOWN_ERROR} [CronJobs]` })
  }

  // 2. Drena e fecha os workers (dependem do Redis/BullMQ)
  try {
    await applicationWorkerManager.closeAll()
    logger.info(WORKERS_SHUTDOWN)
  } catch (error: unknown) {
    logError({ error, message: `${GRACEFUL_SHUTDOWN_ERROR} [BullMQ Workers]` })
  }

  // 3. Desconecta do Postgres (nenhum worker ativo para fazer queries)
  try {
    await prisma.$disconnect()
    logger.info(DATABASE_SHUTDOWN)
  } catch (error: unknown) {
    logError({ error, message: `${GRACEFUL_SHUTDOWN_ERROR} [Postgres]` })
  }

  // 4. Fecha o Redis (schedulers e workers já encerrados)
  try {
    await redis.quit()
    logger.info(REDIS_SHUTDOWN)
  } catch (error: unknown) {
    logError({ error, message: `${GRACEFUL_SHUTDOWN_ERROR} [Redis]` })
  }

  // 5. Fecha o Sentry por último, garantindo que erros anteriores sejam enviados
  try {
    await Sentry.close(SENTRY_CLOSE_TIMEOUT)
    logger.info(SENTRY_SHUTDOWN)
  } catch (error: unknown) {
    logError({ error, message: `${GRACEFUL_SHUTDOWN_ERROR} [Sentry]` })
  }

  process.exit(0)
}
