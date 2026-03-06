import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { BLOGS_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { CONTENT_LEADER_PERMISSIONS, CONTENT_PRODUCERS_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createBlogBodySchema } from '@http/schemas/blog/create-blog-body-schema'
import { createDraftCopyBlogParamsSchema } from '@http/schemas/blog/create-draft-copy-blog-params-schema'
import { deleteBlogParamsSchema } from '@http/schemas/blog/delete-blog-params-schema'
import { findBlogByPublicIdParamsSchema } from '@http/schemas/blog/find-blog-by-public-id-query-schema'
import { getAllBlogsDetailedQuerySchema } from '@http/schemas/blog/get-all-blogs-detailed-query-schema'
import { getAllBlogsQuerySchema } from '@http/schemas/blog/get-all-blogs-query-schema'
import { getAllUserBlogsDetailedQuerySchema } from '@http/schemas/blog/get-all-user-blogs-detailed-query-schema'
import { getBlogHtmlContentParamsSchema } from '@http/schemas/blog/get-blog-html-content-params-schema'
import { getRestrictBlogHtmlContentParamsSchema } from '@http/schemas/blog/get-restrict-blog-html-content-params-schema'
import { submitDraftForReviewParamsSchema } from '@http/schemas/blog/submit-draft-for-review-params-schema'
import { submitPendingToReviewParamsSchema } from '@http/schemas/blog/submit-pending-to-review-params-schema'
import { submitPublishedToPendingParamsSchema } from '@http/schemas/blog/submit-published-to-review-params-schema'
import { submitReviewToPendingParamsSchema } from '@http/schemas/blog/submit-review-to-pending-params-schema'
import { submitPendingToPublishParamsSchema } from '@http/schemas/blog/submit-review-to-publish-params-schema'
import { updateBlogBodySchema } from '@http/schemas/blog/update-blog-body-schema'
import { updateBlogParamsSchema } from '@http/schemas/blog/update-blog-params-schema'
import { rateLimit } from '@utils/http/rate-limit'
import { createDraftBlog } from './create-draft-blog.controller'
import { createDraftCopyBlog } from './create-draft-copy-blog.controller'
import { createPendingBlog } from './create-pending-blog.controller'
import { deleteBlog } from './delete-blog.controller'
import { findBlogByPublicId } from './find-blog-by-public-id.controller'
import { findBlogByPublicIdRestricted } from './find-blog-by-public-id-detailed.controller'
import { getAllBlogs } from './get-all-blogs.controller'
import { getAllBlogsDetailed } from './get-all-blogs-detailed.controller'
import { getAllUserBlogsDetailed } from './get-all-user-blogs-detailed.controller'
import { getBlogHtmlContent } from './get-blog-html-content.controller'
import { getRestrictBlogHtmlContent } from './get-restrict-blog-html-content.controller'
import { createAndPublishBlog } from './publish-blog.controller'
import { submitDraftForReview } from './submit-draft-for-review.controller'
import { submitPendingToPublish } from './submit-pending-to-publish.controller'
import { submitPendingToReview } from './submit-pending-to-review.controller'
import { submitPublishedToPending } from './submit-published-to-pending.controller'
import { submitReviewToPending } from './submit-review-to-pending.controller'
import { updateBlog } from './update-blog.controller'
import { uploadBlogBanner } from './upload-blog-banner.controller'
import { uploadBlogImage } from './upload-blog-image.controller'

export async function blogRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: getAllBlogsQuerySchema,
      },
    },
    getAllBlogs,
  )
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        querystring: getAllBlogsDetailedQuerySchema,
      },
    },
    getAllBlogsDetailed,
  )
  app.get(
    '/restrict/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        querystring: getAllUserBlogsDetailedQuerySchema,
      },
    },
    getAllUserBlogsDetailed,
  )
  app.get(
    '/:publicId/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        params: getBlogHtmlContentParamsSchema,
      },
    },
    getBlogHtmlContent,
  )
  app.get(
    '/restrict/:publicId/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: getRestrictBlogHtmlContentParamsSchema,
      },
    },
    getRestrictBlogHtmlContent,
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: findBlogByPublicIdParamsSchema,
      },
    },
    findBlogByPublicIdRestricted,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        params: findBlogByPublicIdParamsSchema,
      },
    },
    findBlogByPublicId,
  )

  // POST
  app.post(
    '/create/pending',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        body: createBlogBodySchema,
      },
    },
    createPendingBlog,
  )
  app.post(
    '/create/draft',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        body: createBlogBodySchema,
      },
    },
    createDraftBlog,
  )
  app.post(
    '/:publicId/create-draft-copy',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: createDraftCopyBlogParamsSchema,
      },
    },
    createDraftCopyBlog,
  )
  app.post(
    '/create/publish',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        body: createBlogBodySchema,
      },
    },
    createAndPublishBlog,
  )
  app.post(
    '/uploads/image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
    },
    uploadBlogImage,
  )
  app.post(
    '/uploads/banner',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
    },
    uploadBlogBanner,
  )

  // PATCH
  app.patch(
    '/:publicId/submit-draft-for-review',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: submitDraftForReviewParamsSchema,
      },
    },
    submitDraftForReview,
  )
  app.patch(
    '/:publicId/submit-review-to-pending',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: submitReviewToPendingParamsSchema,
      },
    },
    submitReviewToPending,
  )
  app.patch(
    '/:publicId/submit-pending-to-publish',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        params: submitPendingToPublishParamsSchema,
      },
    },
    submitPendingToPublish,
  )
  app.patch(
    '/:publicId/submit-published-to-pending',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        params: submitPublishedToPendingParamsSchema,
      },
    },
    submitPublishedToPending,
  )
  app.patch(
    '/:publicId/submit-pending-to-review',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        params: submitPendingToReviewParamsSchema,
      },
    },
    submitPendingToReview,
  )
  app.patch(
    '/:publicId',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: updateBlogParamsSchema,
        body: updateBlogBodySchema,
      },
    },
    updateBlog,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        params: deleteBlogParamsSchema,
      },
    },
    deleteBlog,
  )
}
