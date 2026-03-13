import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllMeetingsQueryType } from '@custom-types/http/schemas/meeting/get-all-meetings-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingDetailedPresenter } from '@http/presenters/meeting/meeting-detailed.presenter'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllMeetingsController implements IController {
  constructor(
    @inject(GetAllMeetingsUseCase)
    private readonly useCase: GetAllMeetingsUseCase,

    @inject(MeetingDetailedPresenter)
    private readonly meetingDetailedPresenter: MeetingDetailedPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllMeetingsQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.meetingDetailedPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
