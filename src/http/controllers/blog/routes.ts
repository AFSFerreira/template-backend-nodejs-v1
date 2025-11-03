import type { FastifyInstance } from 'fastify'
import { findByPublicIdWithVisualization } from './find-by-public-id-with-visualization.controller'
import { getAllBlogs } from './get-all-blogs.controller'

export async function blogRoutes(app: FastifyInstance) {
  app.get('/all-blogs', getAllBlogs)
  app.get('/:publicId', findByPublicIdWithVisualization)
}
