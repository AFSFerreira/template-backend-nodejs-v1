import type { FastifyInstance } from 'fastify'
import { getAcademicPublicationsYearsController } from './get-academic-publications-years.controller'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getAllAcademicPublicationsController)
  app.get('/years', getAcademicPublicationsYearsController)
}
