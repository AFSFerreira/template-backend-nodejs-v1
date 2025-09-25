import type { FastifyInstance } from 'fastify'
import { getAllStates } from './get-all-states-query-schema.controller'

export async function addressRoutes(app: FastifyInstance) {
  app.get('/states', getAllStates)
}
