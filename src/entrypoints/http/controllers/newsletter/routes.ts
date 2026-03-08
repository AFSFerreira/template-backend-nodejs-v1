import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { NEWSLETTER_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createNewsletterBodySchema } from '@http/schemas/newsletter/create-newsletter-body-schema'
import { deleteNewsletterParamsSchema } from '@http/schemas/newsletter/delete-newsletter-params-schema'
import { findNewsletterByPublicIdParamsSchema } from '@http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import { getAllNewslettersQuerySchema } from '@http/schemas/newsletter/get-all-newsletters-query-schema'
import { previewNewsletterContentBodySchema } from '@http/schemas/newsletter/preview-newsletter-content-body-schema'
import { updateNewsletterBodySchema } from '@http/schemas/newsletter/update-newsletter-body-schema'
import { updateNewsletterParamsSchema } from '@http/schemas/newsletter/update-newsletter-params-schema'
import { newsletterSwaggerDocs } from '@lib/swagger/models/newsletter'
import { rateLimit } from '@utils/http/rate-limit'
import { createNewsletter } from './create-newsletter.controller'
import { deleteNewsletter } from './delete-newsletter.controller'
import { findNewsletterByPublicId } from './find-newsletter-by-public-id.controller'
import { findNewsletterByPublicIdRestricted } from './find-newsletter-by-public-id-restricted.controller'
import { getAllNewsletters } from './get-all-newsletters.controller'
import { getNewsletterHtmlContent } from './get-newsletter-html-content.controller'
import { previewNewsletterContent } from './preview-newsletter-content.controller'
import { sendNewsletterEmail } from './send-newsletter-email.controller'
import { updateNewsletter } from './update-newsletter.controller'
import { uploadNewsletterHtml } from './upload-newsletter-html.controller'
import { uploadNewsletterImage } from './upload-newsletter-image.controller'

export async function newsletterRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...newsletterSwaggerDocs.getAllNewsletters,
        querystring: getAllNewslettersQuerySchema,
      },
    },
    getAllNewsletters,
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.findNewsletterByPublicIdRestricted,
        params: findNewsletterByPublicIdParamsSchema,
      },
    },
    findNewsletterByPublicIdRestricted,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...newsletterSwaggerDocs.findNewsletterByPublicId,
        params: findNewsletterByPublicIdParamsSchema,
      },
    },
    findNewsletterByPublicId,
  )
  app.get(
    '/:publicId/content',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...newsletterSwaggerDocs.getNewsletterHtmlContent,
        params: findNewsletterByPublicIdParamsSchema,
      },
    },
    getNewsletterHtmlContent,
  )

  // POST
  app.post(
    '/preview-content',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.previewNewsletterContent,
        body: previewNewsletterContentBodySchema,
      },
    },
    previewNewsletterContent,
  )
  app.post(
    '/uploads/html',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS), verifyMultipart],
      schema: {
        ...newsletterSwaggerDocs.uploadNewsletterHtml,
      },
    },
    uploadNewsletterHtml,
  )
  app.post(
    '/uploads/image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS), verifyMultipart],
      schema: {
        ...newsletterSwaggerDocs.uploadNewsletterImage,
      },
    },
    uploadNewsletterImage,
  )
  app.post(
    '/',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.createNewsletter,
        body: createNewsletterBodySchema,
      },
    },
    createNewsletter,
  )
  app.post(
    '/:publicId/send-by-email',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.sendNewsletterEmail,
        params: findNewsletterByPublicIdParamsSchema,
      },
    },
    sendNewsletterEmail,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...NEWSLETTER_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.updateNewsletter,
        params: updateNewsletterParamsSchema,
        body: updateNewsletterBodySchema,
      },
    },
    updateNewsletter,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterSwaggerDocs.deleteNewsletter,
        params: deleteNewsletterParamsSchema,
      },
    },
    deleteNewsletter,
  )
}
