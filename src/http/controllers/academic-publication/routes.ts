import type { FastifyInstance } from 'fastify'
import { getAllAcademicPublicationsController } from './get-all-academic-publications.controller'

export async function academicPublicationRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getAllAcademicPublicationsController)
}
