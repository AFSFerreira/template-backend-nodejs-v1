import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createDirectorPosition } from './create-director-position.controller'
import { deleteDirectorPosition } from './delete-director-position.controller'
import { getAllDirectorPositions } from './get-all-director-positions.controller'
import { updateDirectorPosition } from './update-director-position.controller'

export async function directorPositionRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    getAllDirectorPositions,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorPosition,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateDirectorPosition,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteDirectorPosition,
  )
}
