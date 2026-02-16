import type { FastifyInstance } from 'fastify'
import { rateLimit } from '@utils/http/rate-limit'
import { getAcademicPublicationsYearsController } from './get-academic-publications-years.controller'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllAcademicPublicationsController,
  )
  app.get(
    '/years',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAcademicPublicationsYearsController,
  )
}
