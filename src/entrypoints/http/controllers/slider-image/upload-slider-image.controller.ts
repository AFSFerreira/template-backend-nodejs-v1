import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { sliderImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadSliderImageUseCase } from '@use-cases/slider-image/upload-slider-image'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadSliderImageController implements IController {
  constructor(
    @inject(UploadSliderImageUseCase)
    private readonly useCase: UploadSliderImageUseCase,

    @inject(UploadedFileDefaultPresenter)
    private readonly uploadedFileDefaultPresenter: UploadedFileDefaultPresenter,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(sliderImageMultipartFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = this.uploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
