import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { healthCheckSwaggerDocs } from '@lib/swagger/models/health-check'
import { adaptRoute } from '@utils/http/adapt-route'
import { HealthCheckController } from './health-check.controller'

export async function healthCheckRoutes(app: ExtendedFastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        ...healthCheckSwaggerDocs.healthCheck,
      },
    },
    adaptRoute(HealthCheckController),
  )
}
