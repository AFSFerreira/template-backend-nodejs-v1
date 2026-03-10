import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { updateInstitutionalInfoBodySchema } from '@http/schemas/institutional-info/update-institutional-info-body-schema'
import { institutionalInfoSwaggerDocs } from '@lib/swagger/models/institutional-info'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { GetInstitutionalInfoController } from './get-institutional-info.controller'
import { GetInstitutionalInfoAboutDescriptionHTMLController } from './get-institutional-info-about-html.controller'
import { GetInstitutionalInfoForAdminController } from './get-institutional-info-for-admin.controller'
import { UpdateInstitutionalInfoController } from './update-institutional-info.controller'
import { UploadInstitutionalAboutImageController } from './upload-institutional-about-image.controller'

export async function institutionalInfoRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...institutionalInfoSwaggerDocs.getInstitutionalInfo,
      },
    },
    adaptRoute(GetInstitutionalInfoController),
  )
  app.get(
    '/about-description/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...institutionalInfoSwaggerDocs.getInstitutionalInfoAboutDescriptionHTML,
      },
    },
    adaptRoute(GetInstitutionalInfoAboutDescriptionHTMLController),
  )
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...institutionalInfoSwaggerDocs.getInstitutionalInfoForAdmin,
      },
    },
    adaptRoute(GetInstitutionalInfoForAdminController),
  )

  // POST
  app.post(
    '/uploads/about-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
      schema: {
        ...institutionalInfoSwaggerDocs.uploadInstitutionalAboutImage,
      },
    },
    adaptRoute(UploadInstitutionalAboutImageController),
  )

  // PATCH
  app.patch(
    '/',
    {
      ...INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...institutionalInfoSwaggerDocs.updateInstitutionalInfo,
        body: updateInstitutionalInfoBodySchema,
      },
    },
    adaptRoute(UpdateInstitutionalInfoController),
  )
}
