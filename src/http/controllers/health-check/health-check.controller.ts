import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { prisma } from '@lib/prisma'
import { HEALTHCHECK_ERROR, HEALTHCHECK_FAILED, HEALTHCHECK_SUCESSFUL } from '@messages/loggings/system/server-loggings'

export async function healthCheck(_request: FastifyRequest, reply: FastifyReply) {
  const startTime = Date.now()
  try {
    await prisma.$queryRaw`SELECT 1`

    const uptime = process.uptime()
    const timestamp = new Date().toISOString()
    const duration = Date.now() - startTime

    logger.info({ uptime, duration }, HEALTHCHECK_SUCESSFUL)

    reply.status(200).send({ status: 'ok', uptime, timestamp })
  } catch (error) {
    const duration = Date.now() - startTime
    logError({
      error,
      context: { duration },
      message: HEALTHCHECK_FAILED,
    })

    reply.status(500).send({ status: 'error', message: HEALTHCHECK_ERROR })
  }
}
