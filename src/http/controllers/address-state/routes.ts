import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllStates } from './get-all-states.controller'

export async function addressRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/states',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllStates,
  )
}
