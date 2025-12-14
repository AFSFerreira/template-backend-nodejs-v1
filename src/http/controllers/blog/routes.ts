import type { FastifyInstance } from 'fastify'
import { CONTENT_PRODUCERS_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createBlog } from './create-blog.controller'
import { deleteBlogImage } from './delete-blog-image.controller'
import { findBlogByPublicId } from './find-blog-by-public-id.controller'
import { getAllBlogs } from './get-all-blogs.controller'
import { getBlogHtmlContent } from './get-blog-html-content.controller'
import { uploadBlogBanner } from './upload-blog-banner.controller'
import { uploadBlogImage } from './upload-blog-image.controller'

export async function blogRoutes(app: FastifyInstance) {
  app.get('/', getAllBlogs)
  app.get('/:publicId/html', getBlogHtmlContent)
  app.get('/:publicId', findBlogByPublicId)

  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    createBlog,
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

  app.delete(
    '/temp-images/:fileName',
    {
      preHandler: [verifyJwt, verifyUserRole(CONTENT_PRODUCERS_PERMISSIONS)],
    },
    deleteBlogImage,
  )
}
