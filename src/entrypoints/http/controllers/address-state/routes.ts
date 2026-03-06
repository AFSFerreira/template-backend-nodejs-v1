import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { getAllStatesQuerySchema } from '@http/schemas/address/get-all-states-query-schema'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllStates } from './get-all-states.controller'

export async function addressRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/states',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: getAllStatesQuerySchema,
      },
    },
    getAllStates,
  )
}
