import type { FastifyMultipartOptions } from '@fastify/multipart'
import { MB_IN_BYTES } from '@constants/size-constants'

export const multipartConfiguration = {
  limits: {
    fileSize: 100 * MB_IN_BYTES, // limite máximo de 100mb
    parts: 20,
  },
  throwFileSizeLimit: true,
} as const satisfies FastifyMultipartOptions
