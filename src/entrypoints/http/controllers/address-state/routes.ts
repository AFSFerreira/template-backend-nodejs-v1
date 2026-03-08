import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { getAllStatesQuerySchema } from '@http/schemas/address/get-all-states-query-schema'
import { addressSwaggerDocs } from '@lib/swagger/models/address-state'
import { rateLimit } from '@utils/http/rate-limit'
import { getAllStates } from './get-all-states.controller'

export async function addressRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/states',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...addressSwaggerDocs.getAllStates,
        querystring: getAllStatesQuerySchema,
      },
    },
    getAllStates,
  )
}
