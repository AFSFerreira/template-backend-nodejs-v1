import type { FastifyInstance } from 'fastify'
import { getAllBlogs } from './get-all-blogs.controller'

export async function blogsRoutes(app: FastifyInstance) {
  app.get('/all-blogs', getAllBlogs)
}
