import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
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
import { blogSwaggerDocs } from '@lib/swagger/models/blog'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { CreateDraftBlogController } from './create-draft-blog.controller'
import { CreateDraftCopyBlogController } from './create-draft-copy-blog.controller'
import { CreatePendingBlogController } from './create-pending-blog.controller'
import { DeleteBlogController } from './delete-blog.controller'
import { FindBlogByPublicIdController } from './find-blog-by-public-id.controller'
import { FindBlogByPublicIdRestrictedController } from './find-blog-by-public-id-restrict.controller'
import { GetAllBlogsController } from './get-all-blogs.controller'
import { GetAllBlogsDetailedController } from './get-all-blogs-detailed.controller'
import { GetAllUserBlogsDetailedController } from './get-all-user-blogs-detailed.controller'
import { GetBlogHtmlContentController } from './get-blog-html-content.controller'
import { GetRestrictBlogHtmlContentController } from './get-restrict-blog-html-content.controller'
import { CreateAndPublishBlogController } from './publish-blog.controller'
import { SubmitDraftForReviewController } from './submit-draft-for-review.controller'
import { SubmitPendingToPublishController } from './submit-pending-to-publish.controller'
import { SubmitPendingToReviewController } from './submit-pending-to-review.controller'
import { SubmitPublishedToPendingController } from './submit-published-to-pending.controller'
import { SubmitReviewToPendingController } from './submit-review-to-pending.controller'
import { UpdateBlogController } from './update-blog.controller'
import { UploadBlogBannerController } from './upload-blog-banner.controller'
import { UploadBlogImageController } from './upload-blog-image.controller'

export async function blogRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...blogSwaggerDocs.getAllBlogs,
        querystring: getAllBlogsQuerySchema,
      },
    },
    adaptRoute(GetAllBlogsController),
  )
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.getAllBlogsDetailed,
        querystring: getAllBlogsDetailedQuerySchema,
      },
    },
    adaptRoute(GetAllBlogsDetailedController),
  )
  app.get(
    '/restrict/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.getAllUserBlogsDetailed,
        querystring: getAllUserBlogsDetailedQuerySchema,
      },
    },
    adaptRoute(GetAllUserBlogsDetailedController),
  )
  app.get(
    '/:publicId/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...blogSwaggerDocs.getBlogHtmlContent,
        params: getBlogHtmlContentParamsSchema,
      },
    },
    adaptRoute(GetBlogHtmlContentController),
  )
  app.get(
    '/restrict/:publicId/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.getRestrictBlogHtmlContent,
        params: getRestrictBlogHtmlContentParamsSchema,
      },
    },
    adaptRoute(GetRestrictBlogHtmlContentController),
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.findBlogByPublicIdRestricted,
        params: findBlogByPublicIdParamsSchema,
      },
    },
    adaptRoute(FindBlogByPublicIdRestrictedController),
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...blogSwaggerDocs.findBlogByPublicId,
        params: findBlogByPublicIdParamsSchema,
      },
    },
    adaptRoute(FindBlogByPublicIdController),
  )

  // POST
  app.post(
    '/create/pending',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.createPendingBlog,
        body: createBlogBodySchema,
      },
    },
    adaptRoute(CreatePendingBlogController),
  )
  app.post(
    '/create/draft',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.createDraftBlog,
        body: createBlogBodySchema,
      },
    },
    adaptRoute(CreateDraftBlogController),
  )
  app.post(
    '/:publicId/create-draft-copy',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.createDraftCopyBlog,
        params: createDraftCopyBlogParamsSchema,
      },
    },
    adaptRoute(CreateDraftCopyBlogController),
  )
  app.post(
    '/create/publish',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.createAndPublishBlog,
        body: createBlogBodySchema,
      },
    },
    adaptRoute(CreateAndPublishBlogController),
  )
  app.post(
    '/uploads/image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
      schema: {
        ...blogSwaggerDocs.uploadBlogImage,
      },
    },
    adaptRoute(UploadBlogImageController),
  )
  app.post(
    '/uploads/banner',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
      schema: {
        ...blogSwaggerDocs.uploadBlogBanner,
      },
    },
    adaptRoute(UploadBlogBannerController),
  )

  // PATCH
  app.patch(
    '/:publicId/submit-draft-for-review',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.submitDraftForReview,
        params: submitDraftForReviewParamsSchema,
      },
    },
    adaptRoute(SubmitDraftForReviewController),
  )
  app.patch(
    '/:publicId/submit-review-to-pending',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.submitReviewToPending,
        params: submitReviewToPendingParamsSchema,
      },
    },
    adaptRoute(SubmitReviewToPendingController),
  )
  app.patch(
    '/:publicId/submit-pending-to-publish',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.submitPendingToPublish,
        params: submitPendingToPublishParamsSchema,
      },
    },
    adaptRoute(SubmitPendingToPublishController),
  )
  app.patch(
    '/:publicId/submit-published-to-pending',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.submitPublishedToPending,
        params: submitPublishedToPendingParamsSchema,
      },
    },
    adaptRoute(SubmitPublishedToPendingController),
  )
  app.patch(
    '/:publicId/submit-pending-to-review',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.submitPendingToReview,
        params: submitPendingToReviewParamsSchema,
      },
    },
    adaptRoute(SubmitPendingToReviewController),
  )
  app.patch(
    '/:publicId',
    {
      ...BLOGS_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.updateBlog,
        params: updateBlogParamsSchema,
        body: updateBlogBodySchema,
      },
    },
    adaptRoute(UpdateBlogController),
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
      schema: {
        ...blogSwaggerDocs.deleteBlog,
        params: deleteBlogParamsSchema,
      },
    },
    adaptRoute(DeleteBlogController),
  )
}
