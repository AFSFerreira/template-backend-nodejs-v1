import 'reflect-metadata'
import '@lib/tsyringe/index'
import '@lib/zod/index'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { initSentry } from '@lib/sentry'
import { fastifyErrorHandler } from '@services/error-handlers/fastify-error-handler'
import { registerAppSignals } from '@services/system/register-app-signals'
import fastify from 'fastify'
import { corsConfiguration } from './http/configuration/cors-configuration'
import { fastifyConfiguration } from './http/configuration/fastify-configuration'
import { jwtConfiguration } from './http/configuration/jwt-configuration'
import { multipartConfiguration } from './http/configuration/multipart-configuration'
import { logRequest } from './http/plugins/request-logger'
import { logResponse } from './http/plugins/response-logger'
import { preSerialization } from './http/plugins/serializer'
import { gracefulShutdown } from './http/plugins/shutdown'
import { staticFileRoutes } from './http/plugins/static-files'
import { appRoutes } from './http/routes'

export const app = fastify(fastifyConfiguration)

app.register(multipart, multipartConfiguration)
app.register(staticFileRoutes)
app.register(fastifyCookie)
app.register(rateLimit)
app.register(appRoutes)
app.register(cors, corsConfiguration)
app.register(fastifyJwt, jwtConfiguration)

app.addHook('onRequest', logRequest)
app.addHook('onResponse', logResponse)
app.addHook('preSerialization', preSerialization)
app.addHook('onClose', gracefulShutdown)

initSentry()
registerAppSignals(app)

app.setErrorHandler(fastifyErrorHandler)
