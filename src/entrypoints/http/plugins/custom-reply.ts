import type { PaginationMetaType } from '@custom-types/custom/pagination-meta-type'
import 'fastify'
import type { Readable } from 'node:stream'
import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import type { FastifyReply } from 'fastify'
import { HTML_HEADER } from '@constants/header-constants'
import { getFileExtension } from '@utils/files/get-file-extension'
import { mapExtensionToMimeType } from '@utils/mappers/map-mime-type'
import { StatusCodes } from 'http-status-codes'

declare module 'fastify' {
  interface FastifyReply {
    sendHtml(htmlContent: string): FastifyReply
    sendDownload(stream: Readable, filename: string): FastifyReply
    sendPaginated(data: unknown, meta: PaginationMetaType): FastifyReply
  }
}

export async function customReplyPluginDefinition(app: ExtendedFastifyInstance) {
  app.decorateReply('sendHtml', function (this: FastifyReply, htmlContent: string) {
    return this.status(StatusCodes.OK).type(HTML_HEADER).send(htmlContent)
  })

  app.decorateReply('sendDownload', function (this: FastifyReply, stream: Readable, filename: string) {
    const mimeType = mapExtensionToMimeType(getFileExtension(filename))

    return this.header('Content-Type', mimeType)
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .send(stream)
  })

  app.decorateReply('sendPaginated', function (this: FastifyReply, data: unknown, meta: PaginationMetaType) {
    return this.status(StatusCodes.OK)
      .header('X-Total-Count', meta.totalItems.toString())
      .header('X-Total-Pages', meta.totalPages.toString())
      .send({ data, meta })
  })
}
