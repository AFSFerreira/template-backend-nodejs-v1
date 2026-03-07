import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createDirectorPositionBodySchema } from '@http/schemas/director-position/create-director-position-body-schema'
import { deleteDirectorPositionParamsSchema } from '@http/schemas/director-position/delete-director-position-params-schema'
import { getAllDirectorPositionsSchema } from '@http/schemas/director-position/get-all-director-positions-schema'
import { updateDirectorPositionBodySchema } from '@http/schemas/director-position/update-director-position-body-schema'
import { updateDirectorPositionParamsSchema } from '@http/schemas/director-position/update-director-position-params-schema'
import { directorPositionSwaggerDocs } from '@lib/swagger/models/director-position'
import { rateLimit } from '@utils/http/rate-limit'
import { createDirectorPosition } from './create-director-position.controller'
import { deleteDirectorPosition } from './delete-director-position.controller'
import { getAllDirectorPositions } from './get-all-director-positions.controller'
import { updateDirectorPosition } from './update-director-position.controller'

export async function directorPositionRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorPositionSwaggerDocs.getAllDirectorPositions,
        querystring: getAllDirectorPositionsSchema,
      },
    },
    getAllDirectorPositions,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorPositionSwaggerDocs.createDirectorPosition,
        body: createDirectorPositionBodySchema,
      },
    },
    createDirectorPosition,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorPositionSwaggerDocs.updateDirectorPosition,
        params: updateDirectorPositionParamsSchema,
        body: updateDirectorPositionBodySchema,
      },
    },
    updateDirectorPosition,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorPositionSwaggerDocs.deleteDirectorPosition,
        params: deleteDirectorPositionParamsSchema,
      },
    },
    deleteDirectorPosition,
  )
}
