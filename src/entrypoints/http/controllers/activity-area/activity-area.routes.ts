import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { getAllActivityAreasWithAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import { getAllActivityAreasSchema } from '@http/schemas/activity-area/get-all-activity-areas-schema'
import { getAllActivityAreasWithBlogsQuerySchema } from '@http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import { activityAreaSwaggerDocs } from '@lib/swagger/models/activity-area'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { GetAllActivityAreasController } from './get-all-activity-areas.controller'
import { GetAllActivityAreasWithAcademicPublicationsController } from './get-all-activity-areas-with-academic-publications.controller'
import { GetAllActivityAreasWithBlogsController } from './get-all-activity-areas-with-blogs.controller'

export async function activityAreaRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...activityAreaSwaggerDocs.getAllActivityAreas,
        querystring: getAllActivityAreasSchema,
      },
    },
    adaptRoute(GetAllActivityAreasController),
  )
  app.get(
    '/blogs',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...activityAreaSwaggerDocs.getAllActivityAreasWithBlogs,
        querystring: getAllActivityAreasWithBlogsQuerySchema,
      },
    },
    adaptRoute(GetAllActivityAreasWithBlogsController),
  )
  app.get(
    '/academic-publications',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...activityAreaSwaggerDocs.getAllActivityAreasWithAcademicPublications,
        querystring: getAllActivityAreasWithAcademicPublicationsQuerySchema,
      },
    },
    adaptRoute(GetAllActivityAreasWithAcademicPublicationsController),
  )
}
