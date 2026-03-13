import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { academicPublicationRoutes } from './controllers/academic-publication/academic-publication.routes'
import { activityAreaRoutes } from './controllers/activity-area/activity-area.routes'
import { addressRoutes } from './controllers/address-state/address-state.routes'
import { blogRoutes } from './controllers/blog/blog.routes'
import { dashboardMetricsRoutes } from './controllers/dashboard-metrics/dashboard-metrics.routes'
import { directorBoardRoutes } from './controllers/director-board/director-board.routes'
import { directorPositionRoutes } from './controllers/director-position/director-position.routes'
import { documentManagementRoutes } from './controllers/document-management/document-management.routes'
import { healthCheckRoutes } from './controllers/health-check/health-check.routes'
import { institutionRoutes } from './controllers/institution/institution.routes'
import { institutionalInfoRoutes } from './controllers/institutional-info/institutional-info.routes'
import { meetingRoutes } from './controllers/meeting/meeting.routes'
import { meetingEnrollmentRoutes } from './controllers/meeting-enrollment/meeting-enrollment.routes'
import { newsletterRoutes } from './controllers/newsletter/newsletter.routes'
import { newsletterTemplateRoutes } from './controllers/newsletter-template/newsletter-template.routes'
import { sliderImageRoutes } from './controllers/slider-image/slider-image.routes'
import { userRoutes } from './controllers/user/user.routes'

export async function httpRoutes(app: ExtendedFastifyInstance) {
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
  app.register(newsletterTemplateRoutes, { prefix: '/newsletter-templates' })
  app.register(dashboardMetricsRoutes, { prefix: '/dashboard-metrics' })
  app.register(healthCheckRoutes, { prefix: '/health' })
}
