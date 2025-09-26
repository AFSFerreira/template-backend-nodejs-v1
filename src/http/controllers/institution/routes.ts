import type { FastifyInstance } from 'fastify'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'

export async function institutionRoutes(app: FastifyInstance) {
  app.get('/', getAllInstitutionsWithUsers)
}
