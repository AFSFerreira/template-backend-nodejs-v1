import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createInstitutionBodySchema } from '@http/schemas/institution/create-institution-body-schema'
import { deleteInstitutionParamsSchema } from '@http/schemas/institution/delete-institution-params-schema'
import { getAllInstitutionsQuerySchema } from '@http/schemas/institution/get-all-institutions-query-schema'
import { getAllInstitutionsWithUsersQuerySchema } from '@http/schemas/institution/get-all-institutions-with-users-query-schema'
import { getAllInternalInstitutionsNamesQuerySchema } from '@http/schemas/institution/get-all-internal-institutions-names-query-schema'
import { updateInstitutionBodySchema } from '@http/schemas/institution/update-institution-body-schema'
import { updateInstitutionParamsSchema } from '@http/schemas/institution/update-institution-params-schema'
import { institutionSwaggerDocs } from '@lib/swagger/models/institution'
import { rateLimit } from '@utils/http/rate-limit'
import { createInstitution } from './create-institution.controller'
import { deleteInstitution } from './delete-institution.controller'
import { getAllInstitutionsNames } from './get-all-institutions.controller'
import { getAllInstitutionsWithUsers } from './get-all-institutions-with-users.controller'
import { getAllInternalInstitutionsNames } from './get-all-internal-institutions-names.controller'
import { updateInstitution } from './update-institution.controller'

export async function institutionRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/users',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...institutionSwaggerDocs.getAllInstitutionsWithUsers,
        querystring: getAllInstitutionsWithUsersQuerySchema,
      },
    },
    getAllInstitutionsWithUsers,
  )
  app.get(
    '/names',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...institutionSwaggerDocs.getAllInstitutionsNames,
        querystring: getAllInstitutionsQuerySchema,
      },
    },
    getAllInstitutionsNames,
  )
  app.get(
    '/names/internal',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...institutionSwaggerDocs.getAllInternalInstitutionsNames,
        querystring: getAllInternalInstitutionsNamesQuerySchema,
      },
    },
    getAllInternalInstitutionsNames,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...institutionSwaggerDocs.createInstitution,
        body: createInstitutionBodySchema,
      },
    },
    createInstitution,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...institutionSwaggerDocs.updateInstitution,
        params: updateInstitutionParamsSchema,
        body: updateInstitutionBodySchema,
      },
    },
    updateInstitution,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...institutionSwaggerDocs.deleteInstitution,
        params: deleteInstitutionParamsSchema,
      },
    },
    deleteInstitution,
  )
}
