import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { healthCheckSwaggerDocs } from '@lib/swagger/models/health-check'
import { healthCheck } from './health-check.controller'

export async function healthCheckRoutes(app: ExtendedFastifyInstance) {
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
