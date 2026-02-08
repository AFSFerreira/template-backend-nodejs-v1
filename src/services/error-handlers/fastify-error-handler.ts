import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { HAS_SENTRY } from '@constants/env-constants'
import { SystemError } from '@errors/system-error'
import { logError } from '@lib/logger/helpers/log-error'
import { UNHANDLED_ERROR } from '@messages/loggings/system/common-loggings'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses/5xx'
import * as Sentry from '@sentry/node'
import { getBusinessError } from './get-business-error'

export function fastifyErrorHandler(error: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
  const responseError = getBusinessError(error)

  if (responseError === INTERNAL_SERVER_ERROR || responseError instanceof SystemError) {
    if (HAS_SENTRY) {
      Sentry.captureException(error)
    }

    logError({
      error,
      message: UNHANDLED_ERROR,
    })

    return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
  }

  return reply.status(responseError.status).send(responseError.body)
}
