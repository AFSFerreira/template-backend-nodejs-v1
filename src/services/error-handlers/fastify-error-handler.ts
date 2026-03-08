import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { HAS_SENTRY } from '@constants/env-constants'
import { SystemError } from '@errors/system-error'
import { logError } from '@lib/pino/helpers/log-error'
import { UNHANDLED_ERROR } from '@messages/loggings/system/common-loggings'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses/5xx'
import * as Sentry from '@sentry/node'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { sanitizePayload } from '@utils/formatters/sanitize-payload'
import { getClientIp } from '@utils/http/get-client-ip'
import { getBusinessError } from './get-business-error'

export function fastifyErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  const responseError = getBusinessError(error)

  if (responseError === INTERNAL_SERVER_ERROR || responseError instanceof SystemError) {
    if (HAS_SENTRY) {
      Sentry.withScope((scope) => {
        if (request.user) {
          scope.setUser({ id: getRequestUserPublicId(request) })
        }

        scope.setTag('method', request.method)

        scope.setTag('route', request.routeOptions?.url || 'unknown_route')

        scope.setContext('request_data', {
          url: request.url,
          headers: request.headers,
          query: request.query,
          params: request.params,
          body: sanitizePayload(request.body),
          ip: getClientIp(request),
        })

        Sentry.captureException(error)
      })
    }

    logError({
      error,
      message: UNHANDLED_ERROR,
    })

    return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
  }

  return reply.status(responseError.status).send(responseError.body)
}
