import { HAS_SENTRY } from '@constants/env-constants'
import { env } from '@env/index'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import type { FastifyInstance } from 'fastify'

export function initSentry(app: FastifyInstance) {
  if (!HAS_SENTRY) return

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profileSessionSampleRate: 1.0,
    profileLifecycle: 'trace',
  })

  Sentry.setupFastifyErrorHandler(app)
}
