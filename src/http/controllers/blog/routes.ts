import type { FastifyInstance } from 'fastify'
import { CONTENT_LEADER_PERMISSIONS, CONTENT_PRODUCERS_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createDraftBlog } from './create-draft-blog.controller'
import { createDraftCopyBlog } from './create-draft-copy-blog.controller'
import { createPendingBlog } from './create-pending-blog.controller'
import { deleteBlog } from './delete-blog.controller'
import { deleteBlogImage } from './delete-blog-image.controller'
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

export async function blogRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getAllBlogs)
  app.get(
    '/detailed',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
    },
    getAllBlogsDetailed,
  )
  app.get(
    '/detailed/me',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    getAllUserBlogsDetailed,
  )
  app.get('/:publicId/html', getBlogHtmlContent)
  app.get(
    '/restrict/:publicId/html',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    getRestrictBlogHtmlContent,
  )
  app.get(
    '/restrict/:publicId',
    { preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)] },
    findBlogByPublicIdRestricted,
  )
  app.get('/:publicId', findBlogByPublicId)

  // POST
  app.post(
    '/create/pending',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    createPendingBlog,
  )
  app.post(
    '/create/draft',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    createDraftBlog,
  )
  app.post(
    '/:publicId/create-draft-copy',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    createDraftCopyBlog,
  )
  app.post(
    '/create/publish',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
    },
    createAndPublishBlog,
  )
  app.post(
    '/uploads/image',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
    },
    uploadBlogImage,
  )
  app.post(
    '/uploads/banner',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS), verifyMultipart],
    },
    uploadBlogBanner,
  )

  // PATCH
  app.patch(
    '/:publicId/submit-draft-for-review',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    submitDraftForReview,
  )
  app.patch(
    '/:publicId/submit-review-to-pending',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    submitReviewToPending,
  )
  app.patch(
    '/:publicId/submit-pending-to-publish',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
    },
    submitPendingToPublish,
  )
  app.patch(
    '/:publicId/submit-published-to-pending',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
    },
    submitPublishedToPending,
  )
  app.patch(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    updateBlog,
  )
  app.patch(
    '/:publicId/submit-pending-to-review',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_LEADER_PERMISSIONS)],
    },
    submitPendingToReview,
  )

  // DELETE
  app.delete(
    '/temp-images/:filename',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    deleteBlogImage,
  )
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    deleteBlog,
  )
}
