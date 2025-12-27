import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { getBlogsMetrics } from './get-blogs-metrics.controller'
import { getNewslettersMetrics } from './get-newsletters-metrics.controller'
import { getUsersMetrics } from './get-users-metrics.controller'

export async function dashboardMetricsRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/blogs',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getBlogsMetrics,
  )
  app.get(
    '/users',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getUsersMetrics,
  )
  app.get(
    '/newsletters',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getNewslettersMetrics,
  )
}
