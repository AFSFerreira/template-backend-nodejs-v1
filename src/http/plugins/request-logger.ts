import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { asyncLocalStorage } from '@lib/async-local-storage'
import { logger } from '@lib/pino'
import { INCOMING_REQUEST } from '@messages/loggings/system/common-loggings'
import { getClientIp } from '@utils/http/get-client-ip'
import { v7 as uuidv7 } from 'uuid'

function logRequestDetails(request: FastifyRequest) {
  const clientIp = getClientIp(request)

  logger.info(
    {
      method: request.method,
      url: request.url,
      ip: clientIp,
      remotePort: request.socket.remotePort,
      userAgent: request.headers['user-agent'],
    },
    INCOMING_REQUEST,
  )
}

export function logRequest(request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction) {
  const requestId = uuidv7()
  const requestInfo = {
    host: request.host,
    protocol: request.protocol,
  }

  asyncLocalStorage.run({ requestId, requestInfo }, async () => {
    logRequestDetails(request)
    done()
  })
}
