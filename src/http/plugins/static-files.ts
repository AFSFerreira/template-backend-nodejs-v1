import type { FastifyInstance } from 'fastify'
import path from 'node:path'
import {
  BASE_PROJECT_PATH,
  PARTIAL_MEETING_BANNERS_IMAGE_PATH,
  PARTIAL_REGISTER_PROFILE_IMAGES_PATH,
} from '@constants/dynamic-file-constants'
import fastifyStatic from '@fastify/static'
import { staticRouteConfigurations } from '../configuration/static-routes-configuration'

export async function staticFileRoutes(app: FastifyInstance) {
  const fileRoutes = [
    {
      prefix: '/static/users/profile-images/',
      root: path.resolve(BASE_PROJECT_PATH, PARTIAL_REGISTER_PROFILE_IMAGES_PATH),
    },
    {
      prefix: '/static/meetings/banners/',
      root: path.resolve(BASE_PROJECT_PATH, PARTIAL_MEETING_BANNERS_IMAGE_PATH),
    },
    {
      prefix: '/static/blogs/banners/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'banners'),
    },
    {
      prefix: '/static/blogs/images/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'images'),
    },
    {
      prefix: '/static/blogs/temp-images/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'images'),
    },
    {
      prefix: '/static/blogs/temp-banners/',
      root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'banners'),
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
