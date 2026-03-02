import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllActivityAreas } from './get-all-activity-areas.controller'
import { getAllActivityAreasWithAcademicPublicationsController } from './get-all-activity-areas-with-academic-publications.controller'
import { getAllActivityAreasWithBlogs } from './get-all-activity-areas-with-blogs.controller'

export async function activityAreaRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllActivityAreas,
  )
  app.get(
    '/blogs',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllActivityAreasWithBlogs,
  )
  app.get(
    '/academic-publications',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllActivityAreasWithAcademicPublicationsController,
  )
}
