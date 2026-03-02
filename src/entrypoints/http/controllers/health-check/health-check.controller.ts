import type { FastifyReply, FastifyRequest } from 'fastify'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { prisma } from '@lib/prisma'
import { HEALTHCHECK_ERROR, HEALTHCHECK_FAILED, HEALTHCHECK_SUCESSFUL } from '@messages/loggings/system/server-loggings'

export async function healthCheck(_request: FastifyRequest, reply: FastifyReply) {
  const startTime = Date.now()

  const databaseStatus = await prisma.$healthCheck()

  const duration = Date.now() - startTime

  const uptime = process.uptime()
  const timestamp = new Date().toISOString()

  switch (databaseStatus.status) {
    case 'healthy': {
      logger.info({ uptime, duration }, HEALTHCHECK_SUCESSFUL)

      return reply.status(200).send({ status: 'ok', uptime, timestamp })
    }

    case 'unhealthy': {
      logError({
        error: databaseStatus.error,
        context: { duration },
        message: HEALTHCHECK_FAILED,
      })

      return reply.status(500).send({ status: 'error', message: HEALTHCHECK_ERROR })
    }

    default: {
      throw new UnreachableCaseError(databaseStatus satisfies never)
    }
  }
}
