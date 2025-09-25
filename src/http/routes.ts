import type { FastifyInstance } from 'fastify'
import { activityAreaRoutes } from './controllers/activity-area/routes'
import { addressRoutes } from './controllers/address/routes'
import { blogsRoutes } from './controllers/blog/routes'
import { healthCheck } from './controllers/health-check/health-check.controller'
import { meetingRoutes } from './controllers/meeting/routes'
import { userRoutes } from './controllers/user/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(activityAreaRoutes, { prefix: '/activity-areas' })
  app.register(addressRoutes, { prefix: '/addresses' })
  app.register(blogsRoutes, { prefix: '/blogs' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(meetingRoutes, { prefix: '/meetings' })

  app.get('/health', healthCheck)
}
