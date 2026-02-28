import type { FastifyMultipartOptions } from '@fastify/multipart'
import { MAX_DOCUMENT_FILE_SIZE_BYTES, MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES, MB_IN_BYTES } from './size-constants'

export const statuteMultipartFileConfig = {
  limits: {
    fileSize: MAX_DOCUMENT_FILE_SIZE_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const electionNoticeMultipartFileConfig = {
  limits: {
    fileSize: MAX_DOCUMENT_FILE_SIZE_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const userProfilePictureFileConfig = {
  limits: {
    fileSize: MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const directorBoardProfilePictureFileConfig = {
  limits: {
    fileSize: 15 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const institutionalAboutImageFileConfig = {
  limits: {
    fileSize: 30 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const sliderImageMultipartFileConfig = {
  limits: {
    fileSize: 30 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const blogBannerMultipartFileConfig = {
  limits: {
    fileSize: 15 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const blogImageMultipartFileConfig = {
  limits: {
    fileSize: 10 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const meetingBannerMultipartFileConfig = {
  limits: {
    fileSize: 15 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const meetingAgendaMultipartFileConfig = {
  limits: {
    fileSize: 30 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const newsletterHtmlMultipartFileConfig = {
  limits: {
    fileSize: 5 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions

export const newsletterImageMultipartFileConfig = {
  limits: {
    fileSize: 10 * MB_IN_BYTES,
  },
} as const satisfies FastifyMultipartOptions
