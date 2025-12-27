import type { FastifyInstance } from 'fastify'
import { CONTENT_PRODUCERS_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createNewsletter } from './create-newsletter.controller'
import { uploadNewsletterHtml } from './upload-newsletter-html.controller'

export async function newsletterRoutes(app: FastifyInstance) {
  // POST
  app.post(
    '/uploads/html',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
    },
    uploadNewsletterHtml,
  )
  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    createNewsletter,
  )
}
