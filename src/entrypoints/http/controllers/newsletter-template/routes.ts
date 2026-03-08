import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { findNewsletterTemplateByPublicIdParamsSchema } from '@http/schemas/newsletter-template/find-newsletter-template-by-public-id-params-schema'
import { getAllNewsletterTemplatesQuerySchema } from '@http/schemas/newsletter-template/get-all-newsletter-templates-query-schema'
import { newsletterTemplateSwaggerDocs } from '@lib/swagger/models/newsletter-template'
import { rateLimit } from '@utils/http/rate-limit'
import { findNewsletterTemplateByPublicId } from './find-newsletter-template-by-public-id.controller'
import { getAllNewsletterTemplates } from './get-all-newsletter-templates.controller'

export async function newsletterTemplateRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterTemplateSwaggerDocs.getAllNewsletterTemplates,
        querystring: getAllNewsletterTemplatesQuerySchema,
      },
    },
    getAllNewsletterTemplates,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_AND_NEWSLETTER_LEADER_PERMISSIONS)],
      schema: {
        ...newsletterTemplateSwaggerDocs.findNewsletterTemplateByPublicId,
        params: findNewsletterTemplateByPublicIdParamsSchema,
      },
    },
    findNewsletterTemplateByPublicId,
  )
}
