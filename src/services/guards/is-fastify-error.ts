import type { FastifyError } from 'fastify'

export function isFastifyError(error: Error): error is FastifyError {
  return typeof error === 'object' && error !== null && 'code' in error && 'statusCode' in error
}
