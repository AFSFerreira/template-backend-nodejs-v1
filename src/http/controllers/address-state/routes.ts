import type { FastifyInstance } from 'fastify'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllStates } from './get-all-states.controller'

export async function addressRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/states',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllStates,
  )
}
