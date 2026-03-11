import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindUserByIdParamsType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingDetailedPresenter } from '@http/presenters/meeting/meeting-detailed.presenter'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindMeetingByPublicIdController implements IController {
  constructor(
    @inject(FindMeetingByPublicIdUseCase)
    private readonly useCase: FindMeetingByPublicIdUseCase,

    @inject(MeetingDetailedPresenter)
    private readonly meetingDetailedPresenter: MeetingDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindUserByIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { meeting } = await this.useCase.execute({ publicId })

    const formattedReply = this.meetingDetailedPresenter.toHTTP(meeting)

    return await reply.sendResponse(formattedReply)
  }
}
