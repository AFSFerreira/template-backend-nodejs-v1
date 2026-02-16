import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { getBlogsMetrics } from './get-blogs-metrics.controller'
import { getNewslettersMetrics } from './get-newsletters-metrics.controller'
import { getUsersMetrics } from './get-users-metrics.controller'

export async function dashboardMetricsRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/blogs',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getBlogsMetrics,
  )
  app.get(
    '/users',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getUsersMetrics,
  )
  app.get(
    '/newsletters',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getNewslettersMetrics,
  )
}
