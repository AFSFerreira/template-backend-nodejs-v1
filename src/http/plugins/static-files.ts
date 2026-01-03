import type { FastifyInstance } from 'fastify'
import {
  BLOG_BANNERS_PATH,
  BLOG_IMAGES_PATH,
  BLOG_TEMP_BANNERS_PATH,
  BLOG_TEMP_IMAGES_PATH,
  DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
  DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH,
  INSTITUTIONAL_ABOUT_IMAGES_PATH,
  INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
  MEETING_BANNERS_PATH,
  NEWSLETTER_HTML_PATH,
  REGISTER_PROFILE_IMAGES_PATH,
  SLIDER_IMAGES_PATH,
} from '@constants/dynamic-file-constants'
import {
  STATIC_BLOG_BANNERS_IMAGE_ROUTE,
  STATIC_BLOG_IMAGE_ROUTE,
  STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
  STATIC_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
  STATIC_MEETING_BANNERS_IMAGE_ROUTE,
  STATIC_NEWSLETTER_HTML_ROUTE,
  STATIC_SLIDER_IMAGES_ROUTE,
  STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE,
  STATIC_TEMP_BLOG_IMAGES_ROUTE,
  STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
  STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
  STATIC_USER_PROFILE_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import fastifyStatic from '@fastify/static'
import { staticRouteConfigurations } from '../configuration/static-routes-configuration'

export async function staticFileRoutes(app: FastifyInstance) {
  const fileRoutes: Array<{ prefix: string; root: string }> = [
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
      prefix: STATIC_TEMP_BLOG_IMAGES_ROUTE,
      root: BLOG_TEMP_IMAGES_PATH,
    },
    {
      prefix: STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE,
      root: BLOG_TEMP_BANNERS_PATH,
    },
    {
      prefix: STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
      root: DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
    },
    {
      prefix: STATIC_SLIDER_IMAGES_ROUTE,
      root: SLIDER_IMAGES_PATH,
    },
    {
      prefix: STATIC_NEWSLETTER_HTML_ROUTE,
      root: NEWSLETTER_HTML_PATH,
    },
    {
      prefix: STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
      root: DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH,
    },
    {
      prefix: STATIC_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
      root: INSTITUTIONAL_ABOUT_IMAGES_PATH,
    },
    {
      prefix: STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
      root: INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
    },
  ]

  for (const fileRoute of fileRoutes) {
    app.register(fastifyStatic, {
      ...staticRouteConfigurations,
      ...fileRoute,
    })
  }
}
