import type { FastifyInstance } from 'fastify'
import { INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE } from '@constants/route-configuration-constants'
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
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getInstitutionalInfo,
  )
  app.get(
    '/about-description/html',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getInstitutionalInfoAboutDescriptionHTML,
  )
  app.get(
    '/restrict',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    getInstitutionalInfoForAdmin,
  )

  // POST
  app.post(
    '/uploads/about-image',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
    },
    uploadInstitutionalAboutImage,
  )

  // PATCH
  app.patch(
    '/',
    {
      ...INSTITUTIONAL_INFO_PAYLOAD_LIMIT_SIZE,
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateInstitutionalInfo,
  )
}
