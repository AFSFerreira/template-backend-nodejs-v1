import type { FastifyInstance } from 'fastify'
import { academicPublicationRoutes } from './controllers/academic-publications/routes'
import { activityAreaRoutes } from './controllers/activity-area/routes'
import { addressRoutes } from './controllers/address-state/routes'
import { blogRoutes } from './controllers/blog/routes'
import { directorBoardRoutes } from './controllers/director-board/routes'
import { directorPositionRoutes } from './controllers/director-position/routes'
import { documentManagementRoutes } from './controllers/document-management/routes'
import { healthCheck } from './controllers/health-check/health-check.controller'
import { institutionRoutes } from './controllers/institution/routes'
import { meetingRoutes } from './controllers/meeting/routes'
import { userRoutes } from './controllers/user/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(academicPublicationRoutes, { prefix: '/academic-publications' })
  app.register(activityAreaRoutes, { prefix: '/activity-areas' })
  app.register(addressRoutes, { prefix: '/addresses' })
  app.register(blogRoutes, { prefix: '/blogs' })
  app.register(institutionRoutes, { prefix: '/institutions' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(meetingRoutes, { prefix: '/meetings' })
  app.register(directorBoardRoutes, { prefix: '/directors-board' })
  app.register(directorPositionRoutes, { prefix: '/director-positions' })
  app.register(documentManagementRoutes, { prefix: '/document-management' })

  app.get('/health', healthCheck)
}
