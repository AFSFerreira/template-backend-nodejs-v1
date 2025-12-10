import type { FastifyInstance } from 'fastify'
import { findBlogByPublicId } from './find-blog-by-public-id.controller'
import { getAllBlogs } from './get-all-blogs.controller'
import { getBlogHtmlContent } from './get-blog-html-content.controller'

export async function blogRoutes(app: FastifyInstance) {
  app.get('/', getAllBlogs)
  app.get('/:publicId/html', getBlogHtmlContent)
  app.get('/:publicId', findBlogByPublicId)
}
