import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { HAS_SENTRY } from '@constants/env-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { UNHANDLED_ERROR } from '@messages/loggings/common-loggings'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses'
import * as Sentry from '@sentry/node'
import { getBusinessError } from './get-business-error'

export function fastifyErrorHandler(error: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
  const responseError = getBusinessError(error)

  if (responseError === INTERNAL_SERVER_ERROR) {
    if (HAS_SENTRY) {
      Sentry.captureException(error)
    }

    logError({
      error,
      message: UNHANDLED_ERROR,
    })
  }

  return reply.status(responseError.status).send(responseError.body)
}
