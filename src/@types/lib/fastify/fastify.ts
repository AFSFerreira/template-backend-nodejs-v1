import 'fastify'
import type { Readable } from 'node:stream'
import type { PaginationMetaType } from '@custom-types/custom/pagination-meta-type'
import type { IApiResponse } from '@custom-types/responses/api-response'
import type { StatusCodes } from 'http-status-codes'

declare module 'fastify' {
  interface FastifyReply {
    sendHtml(htmlContent: string): FastifyReply
    sendDownload(stream: Readable, filename: string): FastifyReply
    sendPaginated(data: unknown, meta: PaginationMetaType): FastifyReply
    sendApiResponse(apiResponse: IApiResponse): FastifyReply
    sendResponse(data?: unknown, statusCode?: StatusCodes): FastifyReply
  }
}
