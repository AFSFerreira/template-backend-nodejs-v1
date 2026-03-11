import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateMeetingBodyType } from '@custom-types/http/schemas/meeting/create-meeting-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingDetailedPresenter } from '@http/presenters/meeting/meeting-detailed.presenter'
import { CreateMeetingUseCase } from '@use-cases/meeting/create-meeting'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateMeetingController implements IController {
  constructor(
    @inject(CreateMeetingUseCase)
    private readonly useCase: CreateMeetingUseCase,

    @inject(MeetingDetailedPresenter)
    private readonly meetingDetailedPresenter: MeetingDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateMeetingBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { meeting } = await this.useCase.execute(parsedBody)

    const formattedReply = this.meetingDetailedPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
