import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadNewsletterImageUseCase } from '@use-cases/newsletters/upload-newsletter-image'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { newsletterImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { injectable } from 'tsyringe'

@injectable()
export class UploadNewsletterImageController implements IController {
  constructor(private useCase: UploadNewsletterImageUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(newsletterImageMultipartFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
