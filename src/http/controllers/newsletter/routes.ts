import type { FastifyInstance } from 'fastify'
import { NEWSLETTER_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createNewsletter } from './create-newsletter.controller'
import { deleteNewsletter } from './delete-newsletter.controller'
import { findNewsletterByPublicId } from './find-newsletter-by-public-id.controller'
import { getAllNewsletters } from './get-all-newsletters.controller'
import { getNewsletterHtmlContent } from './get-newsletter-html-content.controller'
import { updateNewsletter } from './update-newsletter.controller'
import { uploadNewsletterHtml } from './upload-newsletter-html.controller'
import { uploadNewsletterImage } from './upload-newsletter-image.controller'

export async function newsletterRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    getAllNewsletters,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    findNewsletterByPublicId,
  )
  app.get(
    '/:publicId/content',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    getNewsletterHtmlContent,
  )

  // POST
  app.post(
    '/uploads/html',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS), verifyMultipart],
    },
    uploadNewsletterHtml,
  )
  app.post(
    '/uploads/image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS), verifyMultipart],
    },
    uploadNewsletterImage,
  )
  app.post(
    '/',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    createNewsletter,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    updateNewsletter,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
    },
    deleteNewsletter,
  )
}
