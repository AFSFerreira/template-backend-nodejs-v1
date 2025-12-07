import { MB_IN_BYTES } from '@constants/file-constants'
import type { FastifyMultipartOptions } from '@fastify/multipart'

export const multipartConfiguration = {
  limits: {
    fileSize: 100 * MB_IN_BYTES, // limite máximo de 100mb
    parts: 20,
  },
  throwFileSizeLimit: true,
} satisfies FastifyMultipartOptions
