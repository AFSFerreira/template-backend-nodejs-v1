import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { rateLimit } from '@utils/http/rate-limit'
import { getAcademicPublicationsYearsController } from './get-academic-publications-years.controller'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllAcademicPublicationsController,
  )
  app.get(
    '/years',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAcademicPublicationsYearsController,
  )
}
