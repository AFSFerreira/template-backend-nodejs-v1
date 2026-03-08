import type { PaginationMetaType } from '@custom-types/custom/pagination-meta-type'
import 'fastify'
import type { Readable } from 'node:stream'

// import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyReply {
    sendHtml(htmlContent: string): FastifyReply
    sendDownload(stream: Readable, filename: string): FastifyReply
    sendPaginated(data: unknown, meta: PaginationMetaType): FastifyReply
  }
}

// export async function customReplyPluginDefinition(app: FastifyInstance) {}
