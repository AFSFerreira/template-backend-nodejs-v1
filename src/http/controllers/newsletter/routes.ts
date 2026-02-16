import type { FastifyInstance } from 'fastify'
import { MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createNewsletter } from './create-newsletter.controller'
import { deleteNewsletter } from './delete-newsletter.controller'
import { findNewsletterByPublicId } from './find-newsletter-by-public-id.controller'
import { getAllNewsletters } from './get-all-newsletters.controller'
import { updateNewsletter } from './update-newsletter.controller'
import { uploadNewsletterHtml } from './upload-newsletter-html.controller'

export async function newsletterRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllNewsletters,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    findNewsletterByPublicId,
  )

  // POST
  app.post(
    '/uploads/html',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS), verifyMultipart],
    },
    uploadNewsletterHtml,
  )
  app.post(
    '/',
    {
      ...rateLimit({ max: 15, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    createNewsletter,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    updateNewsletter,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    deleteNewsletter,
  )
}
