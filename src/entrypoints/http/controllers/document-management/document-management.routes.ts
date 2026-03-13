import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { documentManagementSwaggerDocs } from '@lib/swagger/models/document-management'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { GetElectionNoticeController } from './get-election-notice.controller'
import { GetStatuteController } from './get-statute.controller'
import { UploadElectionNoticeController } from './upload-election-notice.controller'
import { UploadStatuteController } from './upload-statute.controller'

export async function documentManagementRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/statute',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...documentManagementSwaggerDocs.getStatute,
      },
    },
    adaptRoute(GetStatuteController),
  )
  app.get(
    '/election-notice',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...documentManagementSwaggerDocs.getElectionNotice,
      },
    },
    adaptRoute(GetElectionNoticeController),
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
    adaptRoute(UploadStatuteController),
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
    adaptRoute(UploadElectionNoticeController),
  )
}
