import type { FastifyInstance } from 'fastify'
import {
  BLOG_BANNERS_PATH,
  BLOG_IMAGES_PATH,
  BLOG_TEMP_BANNERS_PATH,
  BLOG_TEMP_IMAGES_PATH,
  DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
  MEETING_BANNERS_PATH,
  REGISTER_PROFILE_IMAGES_PATH,
  SLIDER_IMAGES_PATH,
} from '@constants/dynamic-file-constants'
import {
  STATIC_BLOG_BANNERS_IMAGE_ROUTE,
  STATIC_BLOG_IMAGE_ROUTE,
  STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
  STATIC_MEETING_BANNERS_IMAGE_ROUTE,
  STATIC_SLIDER_IMAGE_ROUTE,
  STATIC_TEMP_BLOG_BANNERS,
  STATIC_TEMP_BLOG_IMAGES,
  STATIC_USER_PROFILE_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import fastifyStatic from '@fastify/static'
import { staticRouteConfigurations } from '../configuration/static-routes-configuration'

export async function staticFileRoutes(app: FastifyInstance) {
  const fileRoutes = [
    {
      prefix: STATIC_USER_PROFILE_IMAGE_ROUTE,
      root: REGISTER_PROFILE_IMAGES_PATH,
    },
    {
      prefix: STATIC_MEETING_BANNERS_IMAGE_ROUTE,
      root: MEETING_BANNERS_PATH,
    },
    {
      prefix: STATIC_BLOG_BANNERS_IMAGE_ROUTE,
      root: BLOG_BANNERS_PATH,
    },
    {
      prefix: STATIC_BLOG_IMAGE_ROUTE,
      root: BLOG_IMAGES_PATH,
    },
    {
      prefix: STATIC_TEMP_BLOG_IMAGES,
      root: BLOG_TEMP_IMAGES_PATH,
    },
    {
      prefix: STATIC_TEMP_BLOG_BANNERS,
      root: BLOG_TEMP_BANNERS_PATH,
    },
    {
      prefix: STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
      root: DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
    },
    {
      prefix: STATIC_SLIDER_IMAGE_ROUTE,
      root: SLIDER_IMAGES_PATH,
    },
  ]

  for (const fileRoute of fileRoutes) {
    app.register(fastifyStatic, {
      ...staticRouteConfigurations,
      ...fileRoute,
    })
  }
}
