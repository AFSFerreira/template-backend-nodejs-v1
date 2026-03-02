import type { FastifyInstance } from 'fastify'
import { academicPublicationRoutes } from './controllers/academic-publication/routes'
import { activityAreaRoutes } from './controllers/activity-area/routes'
import { addressRoutes } from './controllers/address-state/routes'
import { blogRoutes } from './controllers/blog/routes'
import { dashboardMetricsRoutes } from './controllers/dashboard-metrics/routes'
import { directorBoardRoutes } from './controllers/director-board/routes'
import { directorPositionRoutes } from './controllers/director-position/routes'
import { documentManagementRoutes } from './controllers/document-management/routes'
import { healthCheckRoutes } from './controllers/health-check/routes'
import { institutionRoutes } from './controllers/institution/routes'
import { institutionalInfoRoutes } from './controllers/institutional-info/routes'
import { meetingRoutes } from './controllers/meeting/routes'
import { meetingEnrollmentRoutes } from './controllers/meeting-enrollment/routes'
import { newsletterRoutes } from './controllers/newsletter/routes'
import { sliderImageRoutes } from './controllers/slider-image/routes'
import { userRoutes } from './controllers/user/routes'

export async function httpRoutes(app: FastifyInstance) {
  app.register(academicPublicationRoutes, { prefix: '/academic-publications' })
  app.register(activityAreaRoutes, { prefix: '/activity-areas' })
  app.register(addressRoutes, { prefix: '/addresses' })
  app.register(blogRoutes, { prefix: '/blogs' })
  app.register(institutionRoutes, { prefix: '/institutions' })
  app.register(institutionalInfoRoutes, { prefix: '/institutional-info' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(meetingRoutes, { prefix: '/meetings' })
  app.register(meetingEnrollmentRoutes, { prefix: '/meeting-enrollments' })
  app.register(directorBoardRoutes, { prefix: '/directors-board' })
  app.register(directorPositionRoutes, { prefix: '/director-positions' })
  app.register(documentManagementRoutes, { prefix: '/document-management' })
  app.register(sliderImageRoutes, { prefix: '/slider-images' })
  app.register(newsletterRoutes, { prefix: '/newsletters' })
  app.register(dashboardMetricsRoutes, { prefix: '/dashboard-metrics' })
  app.register(healthCheckRoutes, { prefix: '/health' })
}
