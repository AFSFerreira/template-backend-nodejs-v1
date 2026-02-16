import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createInstitution } from './create-institution.controller'
import { deleteInstitution } from './delete-institution.controller'
import { getAllInstitutionsNames } from './get-all-institutions.controller'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'
import { getAllInternalInstitutionsNames } from './get-all-internal-institutions-names.controller'
import { updateInstitution } from './update-institution.controller'

export async function institutionRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/users',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllInstitutionsWithUsers,
  )
  app.get(
    '/names',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllInstitutionsNames,
  )
  app.get(
    '/names/internal',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllInternalInstitutionsNames,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createInstitution,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateInstitution,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteInstitution,
  )
}
