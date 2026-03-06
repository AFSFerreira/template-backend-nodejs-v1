import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { getAcademicPublicationsYearsQuerySchema } from '@http/schemas/academic-publication/get-academic-publications-years-query-schema'
import { getAllAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-academic-publications-query-schema'
import { rateLimit } from '@utils/http/rate-limit'
import { getAcademicPublicationsYearsController } from './get-academic-publications-years.controller'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
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
        querystring: getAcademicPublicationsYearsQuerySchema,
      },
    },
    getAcademicPublicationsYearsController,
  )
}
