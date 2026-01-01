import type { FastifyMultipartOptions } from '@fastify/multipart'
import {
  MAX_BLOG_BANNER_FILE_SIZE_BYTES,
  MAX_BLOG_IMAGE_FILE_SIZE_BYTES,
  MAX_DOCUMENT_FILE_SIZE_BYTES,
  MAX_MEETING_AGENDA_FILE_SIZE_BYTES,
  MAX_MEETING_BANNER_IMAGE_FILE_SIZE_BYTES,
  MAX_NEWSLETTER_HTML_FILE_SIZE_BYTES,
  MAX_SLIDER_IMAGE_FILE_SIZE_BYTES,
  MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES,
} from './size-constants'

export const statuteMultipartFileConfig = {
  limits: {
    fileSize: MAX_DOCUMENT_FILE_SIZE_BYTES, // 20mb
  },
} satisfies FastifyMultipartOptions

export const electionNoticeMultipartFileConfig = {
  limits: {
    fileSize: MAX_DOCUMENT_FILE_SIZE_BYTES, // 20mb
  },
} satisfies FastifyMultipartOptions

export const profilePictureFileConfig = {
  limits: {
    fileSize: MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES, // 15mb
  },
} satisfies FastifyMultipartOptions

export const sliderImageMultipartFileConfig = {
  limits: {
    fileSize: MAX_SLIDER_IMAGE_FILE_SIZE_BYTES, // 30mb
  },
} satisfies FastifyMultipartOptions

export const blogBannerMultipartFileConfig = {
  limits: {
    fileSize: MAX_BLOG_BANNER_FILE_SIZE_BYTES, // 15mb
  },
} satisfies FastifyMultipartOptions

export const blogImageMultipartFileConfig = {
  limits: {
    fileSize: MAX_BLOG_IMAGE_FILE_SIZE_BYTES, // 10mb
  },
} satisfies FastifyMultipartOptions

export const meetingBannerMultipartFileConfig = {
  limits: {
    fileSize: MAX_MEETING_BANNER_IMAGE_FILE_SIZE_BYTES, // 15mb
  },
} satisfies FastifyMultipartOptions

export const meetingAgendaMultipartFileConfig = {
  limits: {
    fileSize: MAX_MEETING_AGENDA_FILE_SIZE_BYTES, // 30mb
  },
} satisfies FastifyMultipartOptions

export const newsletterHtmlMultipartFileConfig = {
  limits: {
    fileSize: MAX_NEWSLETTER_HTML_FILE_SIZE_BYTES, // 30mb
  },
} satisfies FastifyMultipartOptions
