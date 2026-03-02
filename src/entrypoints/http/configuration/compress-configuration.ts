import type { FastifyCompressOptions } from '@fastify/compress'
import { KB_IN_BYTES } from '@constants/size-constants'

export const compressConfiguration = {
  threshold: 1 * KB_IN_BYTES,
  global: true,
  encodings: ['br', 'gzip', 'deflate'],
} as const satisfies FastifyCompressOptions
