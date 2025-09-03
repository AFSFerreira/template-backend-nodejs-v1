import path from 'path'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static'
import { BODY_REQUIRED, INTERNAL_SERVER_ERROR, VALIDATION_ERROR } from '@messages/errors'
import { ApiError } from '@use-cases/errors/api-error'
import fastify from 'fastify'
import ms from 'ms'
import z, { ZodError } from 'zod'
import { env } from './env/index'
import { appRoutes } from './http/routes'

z.config(z.locales.pt())

export const app = fastify({
  logger: false,
})

app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  exposedHeaders: ['Authorization'],
  maxAge: ms('24h') / 1000, // Cache de 24 horas
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
  root: path.resolve(__dirname, '..', 'uploads', 'profile-images'),
  prefix: '/users/profile-images/',
  decorateReply: false,
  serveDotFiles: false,
  maxAge: '1y',

  setHeaders: (response, _pathName) => {
    response.setHeader('Cache-Control', `public, max-age=${ms('1y')}, immutable`)
  },
})

app.register(fastifyCookie)
app.register(multipart)
app.register(rateLimit)
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(VALIDATION_ERROR.status).send({
      ...VALIDATION_ERROR.body,
      issues: z.treeifyError(error),
    })
  }

  if (error instanceof ApiError) {
    return reply.status(error.status).send(error.body)
  }

  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    return reply.status(BODY_REQUIRED.status).send(BODY_REQUIRED.body)
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to monitoring service
  }

  return reply.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.body)
})
