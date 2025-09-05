import type { FastifyInstance } from 'fastify'
import { getAllActivityAreas } from './get-all-activity-areas.controller'

export async function activityAreaRoutes(app: FastifyInstance) {
  app.get('/', getAllActivityAreas)
}
