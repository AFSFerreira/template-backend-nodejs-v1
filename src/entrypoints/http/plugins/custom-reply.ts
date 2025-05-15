import type { PaginationMetaType } from '@custom-types/custom/pagination-meta-type'
import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import type { IApiResponse } from '@custom-types/responses/api-response'
import type { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export async function customReplyPluginDefinition(app: ExtendedFastifyInstance) {
  app.decorateReply('sendApiResponse', function (this: FastifyReply, apiResponse: IApiResponse) {
    return this.status(apiResponse.status).send(apiResponse.body)
  })

  app.decorateReply('sendPaginated', function (this: FastifyReply, data: unknown, meta: PaginationMetaType) {
    return this.status(StatusCodes.OK)
      .header('X-Total-Count', meta.totalItems.toString())
      .header('X-Total-Pages', meta.totalPages.toString())
      .send({ data, meta })
  })

  app.decorateReply(
    'sendResponse',
    function (this: FastifyReply, data?: unknown, statusCode: StatusCodes = StatusCodes.OK) {
      return this.status(statusCode).send(data !== undefined ? { data } : undefined)
    },
  )
}
