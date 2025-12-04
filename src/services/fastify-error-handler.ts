import { HAS_SENTRY } from '@constants/env-constants'
import { ApiError } from '@errors/api-error'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { UNHANDLED_ERROR } from '@messages/loggings'
import {
  BODY_REQUIRED,
  INTERNAL_SERVER_ERROR,
  INVALID_BODY_FORMAT_JSON,
  MAX_MULTIPART_FILE_SIZE_LIMIT,
  SYNTAX_ERROR,
  VALIDATION_ERROR,
} from '@messages/responses/common-responses'
import * as Sentry from '@sentry/node'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import z, { ZodError } from 'zod'

export function fastifyErrorHandler(error: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const errorTree = z.treeifyError(error)
    logger.warn({ ...VALIDATION_ERROR.body, issues: errorTree })
    return reply.status(VALIDATION_ERROR.status).send({
      ...VALIDATION_ERROR.body,
      issues: errorTree,
    })
  }

  if (error instanceof ApiError) {
    logger.debug(error.body)
    return reply.status(error.status).send(error.body)
  }

  if (error instanceof SyntaxError) {
    logger.debug(SYNTAX_ERROR.body)
    return reply.status(SYNTAX_ERROR.status).send(SYNTAX_ERROR.body)
  }

  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    logger.debug(BODY_REQUIRED.body)
    return reply.status(BODY_REQUIRED.status).send(BODY_REQUIRED.body)
  }

  if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    logger.debug(INVALID_BODY_FORMAT_JSON)
    return reply.status(INVALID_BODY_FORMAT_JSON.status).send(INVALID_BODY_FORMAT_JSON.body)
  }

  if (error.code === 'FST_ERR_CTP_MULTIPART_FILE_SIZE_LIMIT') {
    logError({ error })
    return reply.status(MAX_MULTIPART_FILE_SIZE_LIMIT.status).send(MAX_MULTIPART_FILE_SIZE_LIMIT.body)
  }

  if (HAS_SENTRY) {
    Sentry.captureException(error)
  }

  logError({
    error,
    message: UNHANDLED_ERROR,
  })

  return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
}
