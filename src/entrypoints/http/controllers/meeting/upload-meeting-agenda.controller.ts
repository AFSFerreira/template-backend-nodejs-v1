import type { IController } from '@custom-types/utils/http/adapt-route'
import type { UploadMeetingAgendaUseCase } from '@use-cases/meeting/upload-meeting-agenda'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingAgendaMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { injectable } from 'tsyringe'

@injectable()
export class UploadMeetingAgendaController implements IController {
  constructor(private useCase: UploadMeetingAgendaUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const filePart = await request.file(meetingAgendaMultipartFileConfig)

    documentSchema.parse(filePart)
    const uploadedFile = await this.useCase.execute({ filePart })

    const formattedReply = UploadedFileDefaultPresenter.toHTTP(uploadedFile)

    return await reply.sendResponse(formattedReply)
  }
}
