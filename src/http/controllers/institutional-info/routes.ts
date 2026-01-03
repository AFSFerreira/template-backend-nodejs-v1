import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { getInstitutionalInfoAboutDescriptionHTML } from './get-institutional-info-about-html.controller'
import { updateInstitutionalInfo } from './update-institutional-info.controller'
import { uploadInstitutionalAboutImage } from './upload-institutional-about-image.controller'

export async function institutionalInfoRoutes(app: FastifyInstance) {
  // GET
  app.get('/about-description/html', getInstitutionalInfoAboutDescriptionHTML)

  // POST
  app.post(
    '/uploads/temp-about-image',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
    },
    uploadInstitutionalAboutImage,
  )

  // PATCH
  app.patch(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateInstitutionalInfo,
  )
}
