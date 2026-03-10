import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadDirectorBoardProfileImageUseCase } from '@use-cases/director-board/upload-director-board-profile-image'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { directorBoardProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class UploadDirectorBoardProfileImageController implements IController {
  constructor(private useCase: UploadDirectorBoardProfileImageUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(directorBoardProfilePictureFileConfig)

    imageSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
