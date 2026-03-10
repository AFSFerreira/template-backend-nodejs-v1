import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadMeetingBannerUseCase } from '@use-cases/meeting/upload-meeting-banner'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { injectable } from 'tsyringe'

@injectable()
export class UploadMeetingBannerController implements IController {
  constructor(private useCase: UploadMeetingBannerUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(meetingBannerMultipartFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
