import type { FastifyInstance } from 'fastify'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllActivityAreas } from './get-all-activity-areas.controller'

export async function activityAreaRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllActivityAreas,
  )
}
