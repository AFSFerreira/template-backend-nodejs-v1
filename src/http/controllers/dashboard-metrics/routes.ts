import type { FastifyInstance } from 'fastify'
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
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getBlogsMetrics,
  )
  app.get(
    '/users',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getUsersMetrics,
  )
  app.get(
    '/newsletters',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getNewslettersMetrics,
  )
}
