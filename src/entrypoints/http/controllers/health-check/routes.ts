import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { healthCheck } from './health-check.controller'

export async function healthCheckRoutes(app: ZodFastifyInstance) {
  app.get('/', healthCheck)
}
