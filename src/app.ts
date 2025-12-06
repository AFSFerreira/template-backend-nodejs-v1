import 'reflect-metadata'
import '@lib/tsyringe/index'
import '@lib/zod/index'
import '@presenters/import-index'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { initSentry } from '@lib/sentry'
import { fastifyErrorHandler } from '@services/fastify-error-handler'
import fastify from 'fastify'
import { corsConfig } from 'src/http/configuration/cors-config'
import { fastifyConfig } from 'src/http/configuration/fastify-config'
import { jwtConfig } from 'src/http/configuration/jwt-config'
import { multipartConfig } from './http/configuration/multipart-config'
import { logRequest } from './http/plugins/request-logger'
import { logResponse } from './http/plugins/response-logger'
import { preSerialization } from './http/plugins/serializer'
import { staticFileRoutes } from './http/plugins/static-files'
import { appRoutes } from './http/routes'
import 'reflect-metadata'
import '@lib/tsyringe/index'

export const app = fastify(fastifyConfig)

app.register(multipart, multipartConfig)
app.register(staticFileRoutes)
app.register(fastifyCookie)
app.register(rateLimit)
app.register(appRoutes)
app.register(cors, corsConfig)
app.register(fastifyJwt, jwtConfig)

app.addHook('onRequest', logRequest)
app.addHook('onResponse', logResponse)
app.addHook('preSerialization', preSerialization)

initSentry()

app.setErrorHandler(fastifyErrorHandler)
