import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { getAcademicPublicationsYearsQuerySchema } from '@http/schemas/academic-publication/get-academic-publications-years-query-schema'
import { getAllAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-academic-publications-query-schema'
import { academicPublicationSwaggerDocs } from '@lib/swagger/models/academic-publication'
import { rateLimit } from '@utils/http/rate-limit'
import { getAcademicPublicationsYearsController } from './get-academic-publications-years.controller'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...academicPublicationSwaggerDocs.getAllAcademicPublications,
        querystring: getAllAcademicPublicationsQuerySchema,
      },
    },
    getAllAcademicPublicationsController,
  )
  app.get(
    '/years',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...academicPublicationSwaggerDocs.getAcademicPublicationsYears,
        querystring: getAcademicPublicationsYearsQuerySchema,
      },
    },
    getAcademicPublicationsYearsController,
  )
}
