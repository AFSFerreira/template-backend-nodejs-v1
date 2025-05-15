import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { healthCheckRoutes } from './controllers/health-check/health-check.routes'
import { userRoutes } from './controllers/user/user.routes'

export async function httpRoutes(app: ExtendedFastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(healthCheckRoutes, { prefix: '/health' })
}
