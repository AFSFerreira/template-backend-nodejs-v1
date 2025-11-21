import { HAS_SENTRY, IS_PROD } from '@constants/env-constants'
import { MB_IN_BYTES } from '@constants/file-constants'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { getMulterError } from '@lib/multer/helpers/handle-multer-errors'
import '@lib/zod/index'
import '@presenters/import-index'
import { initSentry } from '@lib/sentry'
import { UNHANDLED_ERROR } from '@messages/loggings'
import {
  BODY_REQUIRED,
  INTERNAL_SERVER_ERROR,
  INVALID_BODY_FORMAT_JSON,
  SYNTAX_ERROR,
  VALIDATION_ERROR,
} from '@messages/responses'
import * as Sentry from '@sentry/node'
import { ApiError } from '@use-cases/errors/api-error'
import fastify from 'fastify'
import ms from 'ms'
import z, { ZodError } from 'zod'
import { env } from './env/index'
import { logRequest } from './http/plugins/request-logger'
import { logResponse } from './http/plugins/response-logger'
import { preSerialization } from './http/plugins/serializer'
import { staticFileRoutes } from './http/plugins/static-files'
import { appRoutes } from './http/routes'
import { initSentry } from '@lib/sentry'
import { logError } from '@lib/logger/helpers/log-error'
import { HAS_SENTRY, IS_PROD } from '@constants/env-constants'
import * as Sentry from "@sentry/node"

export const app = fastify({
  logger: false,
  trustProxy: ['127.0.0.1', '::1', '10.0.0.0/8'],
  bodyLimit: 1 * MB_IN_BYTES,
  routerOptions: {
    caseSensitive: true,
    ignoreTrailingSlash: true,
    maxParamLength: 256,
  },
})

app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
  maxAge: ms('2h') / 1000, // Cache de 2 horas
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_EXPIRATION,
  },
})

app.addHook('onRequest', logRequest)
app.addHook('onResponse', logResponse)
app.addHook('preSerialization', preSerialization)

app.register(staticFileRoutes)
app.register(fastifyCookie)
app.register(multipart)
app.register(rateLimit)
app.register(appRoutes)

initSentry(app)

app.setErrorHandler((error, _request, reply) => {
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

  if (error.name === 'MulterError') {
    const multerError = getMulterError(error)
    return reply.status(multerError.status).send(multerError.body)
  }

  if (IS_PROD && HAS_SENTRY) {
    Sentry.captureException(error)
  } else {
    logError({
      error,
      message: UNHANDLED_ERROR,
    })
  }

  return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
})
