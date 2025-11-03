import type { FastifyInstance } from 'fastify'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'
import { getAllInstitutionsNames } from './get-all-institutions.controller'

export async function institutionRoutes(app: FastifyInstance) {
  app.get('/users', getAllInstitutionsWithUsers)
  app.get('/names', getAllInstitutionsNames)
}
