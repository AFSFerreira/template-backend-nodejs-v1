import { fastifyCompress } from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import { compressConfiguration } from '@http/configurations/compress-configuration'
import { corsConfiguration } from '@http/configurations/cors-configuration'
import { fastifyConfiguration } from '@http/configurations/fastify-configuration'
import { jwtConfiguration } from '@http/configurations/jwt-configuration'
import { multipartConfiguration } from '@http/configurations/multipart-configuration'
import { rateLimitConfigurations } from '@http/configurations/rate-limit-configuration'
import { logRequest } from '@http/plugins/request-logger'
import { logResponse } from '@http/plugins/response-logger'
import { preSerialization } from '@http/plugins/serializer'
import { gracefulShutdown } from '@http/plugins/shutdown'
import { staticFileRoutes } from '@http/plugins/static-files'
import { appRoutes } from '@http/routes'
import '@lib/dayjs/index'
import { initSentry } from '@lib/sentry'
import '@lib/tsyringe/index'
import '@lib/zod/index'
import { fastifyErrorHandler } from '@services/error-handlers/fastify-error-handler'
import { registerAppSignals } from '@services/system/register-app-signals'
import fastify from 'fastify'
import 'reflect-metadata'

export const app = fastify(fastifyConfiguration)

initSentry()
registerAppSignals(app)

app.register(fastifyCompress, compressConfiguration)
app.register(multipart, multipartConfiguration)
app.register(staticFileRoutes)
app.register(fastifyCookie)
app.register(rateLimit, rateLimitConfigurations)
app.register(appRoutes)
app.register(cors, corsConfiguration)
app.register(fastifyJwt, jwtConfiguration)

app.addHook('onRequest', logRequest)
app.addHook('onResponse', logResponse)
app.addHook('preSerialization', preSerialization)
app.addHook('onClose', gracefulShutdown)

app.setErrorHandler(fastifyErrorHandler)
