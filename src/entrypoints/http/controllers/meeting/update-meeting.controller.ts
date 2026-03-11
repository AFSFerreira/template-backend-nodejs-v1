import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateMeetingBodyType } from '@custom-types/http/schemas/meeting/update-meeting-body-schema'
import type { UpdateMeetingParamsType } from '@custom-types/http/schemas/meeting/update-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingDetailedPresenter } from '@http/presenters/meeting/meeting-detailed.presenter'
import { UpdateMeetingUseCase } from '@use-cases/meeting/update-meeting'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateMeetingController implements IController {
  constructor(
    @inject(UpdateMeetingUseCase)
    private readonly useCase: UpdateMeetingUseCase,

    @inject(MeetingDetailedPresenter)
    private readonly meetingDetailedPresenter: MeetingDetailedPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateMeetingBodyType; params: UpdateMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { meeting } = await this.useCase.execute({
      publicId,
      body: parsedBody,
    })

    const formattedReply = this.meetingDetailedPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply)
  }
}
