import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createDirectorPosition } from './create-director-position.controller'
import { getAllDirectorPositions } from './get-all-director-positions.controller'

export async function directorPositionRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    getAllDirectorPositions,
  )

  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorPosition,
  )
}
