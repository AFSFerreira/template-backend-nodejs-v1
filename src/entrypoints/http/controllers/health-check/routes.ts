import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { healthCheckSwaggerDocs } from '@lib/swagger/models/health-check'
import { healthCheck } from './health-check.controller'

export async function healthCheckRoutes(app: ZodFastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        ...healthCheckSwaggerDocs.healthCheck,
      },
    },
    healthCheck,
  )
}
