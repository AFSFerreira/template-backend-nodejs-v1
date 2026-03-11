import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { blogBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadBlogBannerUseCase } from '@use-cases/blog/upload-blog-banner'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadBlogBannerController implements IController {
  constructor(
    @inject(UploadBlogBannerUseCase)
    private readonly useCase: UploadBlogBannerUseCase,

    @inject(UploadedFileDefaultPresenter)
    private readonly uploadedFileDefaultPresenter: UploadedFileDefaultPresenter,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(blogBannerMultipartFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = this.uploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
