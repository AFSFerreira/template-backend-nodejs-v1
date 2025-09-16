import type { FastifyInstance } from 'fastify'
import { activityAreaRoutes } from './controllers/activity-area/routes'
import { healthCheck } from './controllers/health-check/health-check.controller'
import { userRoutes } from './controllers/user/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(activityAreaRoutes, { prefix: '/activity-area' })
  app.get('/health', healthCheck)
}
