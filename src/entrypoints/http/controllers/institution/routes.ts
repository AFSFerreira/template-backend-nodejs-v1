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
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { CreateInstitutionController } from './create-institution.controller'
import { DeleteInstitutionController } from './delete-institution.controller'
import { GetAllInstitutionsNamesController } from './get-all-institutions.controller'
import { GetAllInstitutionsWithUsersController } from './get-all-institutions-with-users.controller'
import { GetAllInternalInstitutionsNamesController } from './get-all-internal-institutions-names.controller'
import { UpdateInstitutionController } from './update-institution.controller'

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
    adaptRoute(GetAllInstitutionsWithUsersController),
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
    adaptRoute(GetAllInstitutionsNamesController),
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
    adaptRoute(GetAllInternalInstitutionsNamesController),
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
    adaptRoute(CreateInstitutionController),
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
    adaptRoute(UpdateInstitutionController),
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
    adaptRoute(DeleteInstitutionController),
  )
}
