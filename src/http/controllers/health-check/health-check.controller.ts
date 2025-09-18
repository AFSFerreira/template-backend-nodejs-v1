import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { prisma } from '@lib/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function healthCheck(_request: FastifyRequest, reply: FastifyReply) {
  const startTime = Date.now()
  try {
    await prisma.$queryRaw`SELECT 1`

    const uptime = process.uptime()
    const timestamp = new Date().toISOString()
    const duration = Date.now() - startTime

    logger.info({ uptime, duration }, 'Healthcheck successful')

    reply.status(200).send({ status: 'ok', uptime, timestamp })
  } catch (error) {
    const duration = Date.now() - startTime
    logError(error, { duration }, 'Healthcheck failed')

    reply.status(500).send({ status: 'error', message: 'Internal healthcheck error' })
  }
}
