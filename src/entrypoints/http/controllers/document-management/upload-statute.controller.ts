import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { statuteMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { UploadStatuteUseCase } from '@use-cases/document-management/upload-statute'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UploadStatuteController implements IController {
  constructor(
    @inject(UploadStatuteUseCase)
    private readonly useCase: UploadStatuteUseCase,
  ) {}

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
