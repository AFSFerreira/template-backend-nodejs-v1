import type { FastifyMultipartOptions } from '@fastify/multipart'
import { MAX_BANNER_IMAGE_FILE_SIZE_BYTES, MAX_DOCUMENT_FILE_SIZE_BYTES, MAX_IMAGE_FILE_SIZE_BYTES } from './size-constants'

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
    fileSize: MAX_IMAGE_FILE_SIZE_BYTES, // 5mb
  },
} satisfies FastifyMultipartOptions

export const sliderImageMultipartFileConfig = {
  limits: {
    fileSize: MAX_BANNER_IMAGE_FILE_SIZE_BYTES, // 10mb
  },
} satisfies FastifyMultipartOptions
