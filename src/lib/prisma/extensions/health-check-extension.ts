import { Prisma } from '@prisma/generated/client'

type IDatabaseHealthCheck =
  | {
      status: 'healthy'
    }
  | {
      status: 'unhealthy'
      error: unknown
    }

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
