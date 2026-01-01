import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createNewsletter } from './create-newsletter.controller'
import { deleteNewsletter } from './delete-newsletter.controller'
import { findNewsletterByPublicId } from './find-newsletter-by-public-id.controller'
import { getAllNewsletters } from './get-all-newsletters.controller'
import { uploadNewsletterHtml } from './upload-newsletter-html.controller'

export async function newsletterRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getAllNewsletters)
  app.get('/:publicId', findNewsletterByPublicId)

  // POST
  app.post(
    '/uploads/html',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadNewsletterHtml,
  )
  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createNewsletter,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteNewsletter,
  )
}
