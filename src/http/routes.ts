import type { FastifyInstance } from 'fastify'
import { activityAreaRoutes } from './controllers/activity-area/routes'
import { userRoutes } from './controllers/user/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(activityAreaRoutes, { prefix: '/activityArea' })
}
