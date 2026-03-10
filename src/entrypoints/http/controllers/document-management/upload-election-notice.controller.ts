import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadElectionNoticeUseCase } from '@use-cases/document-management/upload-election-notice'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { electionNoticeMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class UploadElectionNoticeController implements IController {
  constructor(private useCase: UploadElectionNoticeUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(electionNoticeMultipartFileConfig)

    const { filename } = documentSchema.parse(filePart)
    await this.useCase.execute({
      filePart,
      baseFolder: INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH,
      originalFilename: filename,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
