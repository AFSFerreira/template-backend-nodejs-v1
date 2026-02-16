import type { FastifyInstance } from 'fastify'
import { INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { getInstitutionalInfo } from './get-institutional-info.controller'
import { getInstitutionalInfoAboutDescriptionHTML } from './get-institutional-info-about-html.controller'
import { getInstitutionalInfoForAdmin } from './get-institutional-info-for-admin.controller'
import { updateInstitutionalInfo } from './update-institutional-info.controller'
import { uploadInstitutionalAboutImage } from './upload-institutional-about-image.controller'

export async function institutionalInfoRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getInstitutionalInfo,
  )
  app.get(
    '/about-description/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getInstitutionalInfoAboutDescriptionHTML,
  )
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    getInstitutionalInfoForAdmin,
  )

  // POST
  app.post(
    '/uploads/about-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
    },
    uploadInstitutionalAboutImage,
  )

  // PATCH
  app.patch(
    '/',
    {
      ...INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateInstitutionalInfo,
  )
}
