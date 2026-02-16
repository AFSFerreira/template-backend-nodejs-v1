import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
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
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    getAllDirectorPositions,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorPosition,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateDirectorPosition,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteDirectorPosition,
  )
}
