import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadBlogBannerUseCase } from '@use-cases/blog/upload-blog-banner'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { blogBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { injectable } from 'tsyringe'

@injectable()
export class UploadBlogBannerController implements IController {
  constructor(private useCase: UploadBlogBannerUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(blogBannerMultipartFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
