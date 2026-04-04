import 'reflect-metadata'
import '@lib/dayjs/index'
import '@lib/tsyringe/index'
import '@lib/zod/index'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { IS_DEV } from '@constants/env-constants'
import { fastifyCompress } from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import underPressure from '@fastify/under-pressure'
import fastifyWebsocket from '@fastify/websocket'
import { compressConfiguration } from '@http/configurations/compress-configuration'
import { corsConfiguration } from '@http/configurations/cors-configuration'
import { fastifyConfiguration } from '@http/configurations/fastify-configuration'
import { helmetConfiguration } from '@http/configurations/helmet-configuration'
import { jwtConfiguration } from '@http/configurations/jwt-configuration'
import { rateLimitConfigurations } from '@http/configurations/rate-limit-configuration'
import { swaggerConfiguration } from '@http/configurations/swagger-configuration'
import { swaggerUiConfiguration } from '@http/configurations/swagger-ui-configuration'
import { underPressureConfiguration } from '@http/configurations/under-pressure-configuration'
import { customReplyPluginDefinition } from '@http/plugins/custom-reply'
import { logRequest } from '@http/plugins/request-logger'
import { logResponse } from '@http/plugins/response-logger'
import { gracefulShutdown } from '@http/plugins/shutdown'
import { httpRoutes } from '@http/routes'
import { initSentry } from '@lib/sentry'
import { fastifyErrorHandler } from '@services/error-handlers/fastify-error-handler'
import { registerAppSignals } from '@services/system/register-app-signals'
import { wsConfiguration } from '@ws/configurations/ws-configuration'
import { websocketRoutes } from '@ws/routes'
import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

export async function buildApp(): Promise<FastifyInstance> {
  const app = fastify(fastifyConfiguration).withTypeProvider<ZodTypeProvider>()

  initSentry()
  registerAppSignals(app)

  await customReplyPluginDefinition(app)

  if (IS_DEV) {
    // REVIEW: Vale a pena expôr o JSON para o frontend
    // consumir com um Orval ou Kubb?
    app.register(swagger, swaggerConfiguration)

    app.register(swaggerUi, swaggerUiConfiguration)
  }

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifyWebsocket, wsConfiguration)
  app.register(helmet, helmetConfiguration)
  app.register(underPressure, underPressureConfiguration)
  app.register(fastifyCompress, compressConfiguration)
  app.register(fastifyCookie)
  app.register(rateLimit, rateLimitConfigurations)
  app.register(cors, corsConfiguration)
  app.register(fastifyJwt, jwtConfiguration)

  app.register(httpRoutes)
  app.register(websocketRoutes)

  app.addHook('onRequest', logRequest)
  app.addHook('onResponse', logResponse)
  app.addHook('onClose', gracefulShutdown)

  app.setErrorHandler(fastifyErrorHandler)

  await app.ready()

  return app
}
