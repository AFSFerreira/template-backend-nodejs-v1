import type { HttpHeader } from 'fastify/types/utils'

export interface CustomHttpHeader {
  key: HttpHeader
  value: string
}
