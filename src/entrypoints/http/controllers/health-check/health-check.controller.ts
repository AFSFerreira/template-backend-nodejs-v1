import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { prisma } from '@lib/prisma'
import { HEALTHCHECK_ERROR, HEALTHCHECK_FAILED, HEALTHCHECK_SUCESSFUL } from '@messages/loggings/system/server-loggings'
import { UnreachableCaseError } from '@use-cases/errors/generic/unreachable-case-error'
import { StatusCodes } from 'http-status-codes'
import { singleton } from 'tsyringe'

@singleton()
export class HealthCheckController implements IController {
  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const startTime = Date.now()

    const databaseStatus = await prisma.$healthCheck()

    const duration = Date.now() - startTime

    const uptime = process.uptime()
    const timestamp = new Date().toISOString()

    switch (databaseStatus.status) {
      case 'healthy': {
        logger.info({ uptime, duration }, HEALTHCHECK_SUCESSFUL)

        return reply.status(StatusCodes.OK).send({ status: 'ok', uptime, timestamp })
      }

      case 'unhealthy': {
        logError({
          error: databaseStatus.error,
          context: { duration },
          message: HEALTHCHECK_FAILED,
        })

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', message: HEALTHCHECK_ERROR })
      }

      default: {
        throw new UnreachableCaseError(databaseStatus satisfies never)
      }
    }
  }
}
