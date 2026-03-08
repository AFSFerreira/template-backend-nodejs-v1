import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { dashboardMetricsSwaggerDocs } from '@lib/swagger/models/dashboard-metrics'
import { rateLimit } from '@utils/http/rate-limit'
import { getBlogsMetrics } from './get-blogs-metrics.controller'
import { getNewslettersMetrics } from './get-newsletters-metrics.controller'
import { getUsersMetrics } from './get-users-metrics.controller'

export async function dashboardMetricsRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/blogs',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...dashboardMetricsSwaggerDocs.getBlogsMetrics,
      },
    },
    getBlogsMetrics,
  )
  app.get(
    '/users',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...dashboardMetricsSwaggerDocs.getUsersMetrics,
      },
    },
    getUsersMetrics,
  )
  app.get(
    '/newsletters',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...dashboardMetricsSwaggerDocs.getNewslettersMetrics,
      },
    },
    getNewslettersMetrics,
  )
}
