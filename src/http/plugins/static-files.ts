import type { FastifyInstance } from 'fastify'
import path from 'node:path'
import { BASE_PROJECT_PATH } from '@constants/dynamic-file-constants'
import fastifyStatic from '@fastify/static'
import { staticRouteConfigurations } from '../configuration/static-routes-configuration'

export async function staticFileRoutes(app: FastifyInstance) {
  const fileRoutes = [
    {
      prefix: '/static/users/profile-images/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'user', 'profile-images'),
    },
    {
      prefix: '/static/meetings/banners/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'meeting', 'banners'),
    },
    {
      prefix: '/static/blogs/banners/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'banners'),
    },
    {
      prefix: '/static/directors-board/profile-images/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'director-board', 'profile-images'),
    },
  ]

  for (const fileRoute of fileRoutes) {
    app.register(fastifyStatic, {
      ...staticRouteConfigurations,
      ...fileRoute,
    })
  }
}
