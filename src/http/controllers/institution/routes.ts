import type { FastifyInstance } from 'fastify'
import { getAllInstitutionsNames } from './get-all-institutions.controller'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'

export async function institutionRoutes(app: FastifyInstance) {
  // GET
  app.get('/users', getAllInstitutionsWithUsers)
  app.get('/names', getAllInstitutionsNames)
}
