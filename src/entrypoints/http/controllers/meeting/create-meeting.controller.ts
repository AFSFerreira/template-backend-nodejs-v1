import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateMeetingBodyType } from '@custom-types/http/schemas/meeting/create-meeting-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { CreateMeetingUseCase } from '@use-cases/meeting/create-meeting'
import type { FastifyReply } from 'fastify'
import { MeetingDefaultPresenter } from '@http/presenters/meeting/meeting-default.presenter'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class CreateMeetingController implements IController {
  constructor(private useCase: CreateMeetingUseCase) {}

  async handle(request: ZodRequest<{ body: CreateMeetingBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { meeting } = await this.useCase.execute(parsedBody)

    const formattedReply = MeetingDefaultPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
