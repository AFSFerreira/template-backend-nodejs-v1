import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { dashboardMetricsSwaggerDocs } from '@lib/swagger/models/dashboard-metrics'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { GetBlogsMetricsController } from './get-blogs-metrics.controller'
import { GetNewslettersMetricsController } from './get-newsletters-metrics.controller'
import { GetUsersMetricsController } from './get-users-metrics.controller'
import { RegisterPageViewController } from './register-page-view.controller'

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
    adaptRoute(GetBlogsMetricsController),
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
    adaptRoute(GetUsersMetricsController),
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
    adaptRoute(GetNewslettersMetricsController),
  )

  app.post(
    '/page-views',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...dashboardMetricsSwaggerDocs.registerPageView,
      },
    },
    adaptRoute(RegisterPageViewController),
  )
}
