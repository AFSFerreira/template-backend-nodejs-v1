import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { documentManagementSwaggerDocs } from '@lib/swagger/models/document-management'
import { rateLimit } from '@utils/http/rate-limit'
import { getElectionNotice } from './get-election-notice.controller'
import { getStatute } from './get-statute.controller'
import { uploadElectionNotice } from './upload-election-notice.controller'
import { uploadStatute } from './upload-statute.controller'

export async function documentManagementRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/statute',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...documentManagementSwaggerDocs.getStatute,
      },
    },
    getStatute,
  )
  app.get(
    '/election-notice',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...documentManagementSwaggerDocs.getElectionNotice,
      },
    },
    getElectionNotice,
  )

  // POST
  app.post(
    '/statute',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...documentManagementSwaggerDocs.uploadStatute,
      },
    },
    uploadStatute,
  )
  app.post(
    '/election-notice',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...documentManagementSwaggerDocs.uploadElectionNotice,
      },
    },
    uploadElectionNotice,
  )
}
