import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
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
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllInstitutionsWithUsers,
  )
  app.get(
    '/names',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllInstitutionsNames,
  )
  app.get(
    '/names/internal',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllInternalInstitutionsNames,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createInstitution,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateInstitution,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteInstitution,
  )
}
