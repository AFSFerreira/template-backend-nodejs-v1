import type { IDatabaseHealthCheck } from '@custom-types/lib/prisma/database-health-check'
import { Prisma } from '@prisma/generated/client'

export const healthCheckExtension = Prisma.defineExtension({
  name: 'HealthCheckExtension',
  client: {
    async $healthCheck(): Promise<IDatabaseHealthCheck> {
      try {
        await Prisma.getExtensionContext(this).$queryRaw`SELECT 1`
        return { status: 'healthy' }
      } catch (error) {
        return { status: 'unhealthy', error }
      }
    },
  },
})
