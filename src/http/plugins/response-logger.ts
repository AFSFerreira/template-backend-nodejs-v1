import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { logger } from '@lib/logger'

export function logResponse(request: FastifyRequest, reply: FastifyReply, _done: HookHandlerDoneFunction) {
  logger.info({
    statusCode: reply.statusCode,
    method: request.method,
    url: request.url,
    requestTime: reply.elapsedTime,
  })
}
