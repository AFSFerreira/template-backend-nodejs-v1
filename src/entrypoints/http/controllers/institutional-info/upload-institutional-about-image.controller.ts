import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadInstitutionalAboutImageUseCase } from '@use-cases/institutional-info/upload-institutional-about-image'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { institutionalAboutImageFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class UploadInstitutionalAboutImageController implements IController {
  constructor(private useCase: UploadInstitutionalAboutImageUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(institutionalAboutImageFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
