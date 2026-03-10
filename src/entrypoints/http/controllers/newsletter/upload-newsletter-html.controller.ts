import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadNewsletterHtmlUseCase } from '@use-cases/newsletters/upload-newsletter-html'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { newsletterHtmlMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { fileSchema } from '@lib/zod/utils/generic-components/file-schema'
import { injectable } from 'tsyringe'

@injectable()
export class UploadNewsletterHtmlController implements IController {
  constructor(private useCase: UploadNewsletterHtmlUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(newsletterHtmlMultipartFileConfig)

    fileSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
