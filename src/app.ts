import { MB_IN_BYTES } from '@constants/file-constants'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static'
import { logger } from '@lib/logger'
import '@lib/zod/index'
import { UNHANDLED_ERROR } from '@messages/loggings'
import { ApiError } from '@use-cases/errors/api-error'
import fastify from 'fastify'
import ms from 'ms'
import path from 'node:path'
import z, { ZodError } from 'zod'
import { env } from './env/index'
import { logRequest } from './http/plugins/request-logger'
import { logResponse } from './http/plugins/response-logger'
import { preSerialization } from './http/plugins/serializer'
import { appRoutes } from './http/routes'
import { BODY_REQUIRED, INTERNAL_SERVER_ERROR, SYNTAX_ERROR, VALIDATION_ERROR } from '@messages/responses'

export const app = fastify({
  logger: false,
  trustProxy: ['127.0.0.1', '::1', '10.0.0.0/8'],
  bodyLimit: 1 * MB_IN_BYTES,
  routerOptions: {
    caseSensitive: true,
    ignoreTrailingSlash: true,
    maxParamLength: 512,
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

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', 'uploads', 'user', 'profile-images'),
  prefix: '/users/profile-images/',
  decorateReply: false,
  serveDotFiles: false,
  maxAge: '1y',

  setHeaders: (response, _pathName) => {
    response.setHeader('Cache-Control', `public, max-age=${ms('1y')}, immutable`)
  },
})

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', 'uploads', 'meeting', 'banner'),
  prefix: '/meetings/banners/',
  decorateReply: false,
  serveDotFiles: false,
  maxAge: '1y',

  setHeaders: (response, _pathName) => {
    response.setHeader('Cache-Control', `public, max-age=${ms('1y')}, immutable`)
  },
})

app.addHook('onRequest', logRequest)
app.addHook('onResponse', logResponse)
app.addHook('preSerialization', preSerialization)

app.register(fastifyCookie)
app.register(multipart)
app.register(rateLimit)
app.register(appRoutes)

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
    logger.warn(error.body)
    return reply.status(error.status).send(error.body)
  }

  if (error instanceof SyntaxError) {
    logger.warn(SYNTAX_ERROR.body)
    return reply.status(SYNTAX_ERROR.status).send(SYNTAX_ERROR.body)
  }

  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    logger.warn(BODY_REQUIRED.body)
    return reply.status(BODY_REQUIRED.status).send(BODY_REQUIRED.body)
  }

  // TODO: Send error to monitoring service (SENTRY)
  logger.error({ error }, UNHANDLED_ERROR)

  return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
})
