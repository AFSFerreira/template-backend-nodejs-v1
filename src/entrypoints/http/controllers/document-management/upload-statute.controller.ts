import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadStatuteUseCase } from '@use-cases/document-management/upload-statute'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { statuteMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class UploadStatuteController implements IController {
  constructor(private useCase: UploadStatuteUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(statuteMultipartFileConfig)

    const { filename } = documentSchema.parse(filePart)
    await this.useCase.execute({
      filePart,
      baseFolder: INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH,
      originalFilename: filename,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
