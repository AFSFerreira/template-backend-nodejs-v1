import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createInstitution } from './create-institution.controller'
import { deleteInstitution } from './delete-institution.controller'
import { deleteInstitutionByName } from './delete-institution-by-name.controller'
import { getAllInstitutionsNames } from './get-all-institutions.controller'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'
import { updateInstitution } from './update-institution.controller'

export async function institutionRoutes(app: FastifyInstance) {
  // GET
  app.get('/users', getAllInstitutionsWithUsers)
  app.get('/names', getAllInstitutionsNames)

  // POST
  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createInstitution,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateInstitution,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteInstitution,
  )

  app.delete(
    '/name/:name',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteInstitutionByName,
  )
}
