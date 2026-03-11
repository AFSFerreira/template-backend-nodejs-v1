import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetMeetingParticipantsParamsType } from '@custom-types/http/schemas/meeting/get-meeting-participants-params-schema'
import type { GetMeetingParticipantsQueryType } from '@custom-types/http/schemas/meeting/get-meeting-participants-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { MeetingEnrollmentDetailedPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed.presenter'
import { GetMeetingParticipantsUseCase } from '@use-cases/meeting/get-meeting-participants'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetMeetingParticipantsController implements IController {
  constructor(
    @inject(GetMeetingParticipantsUseCase)
    private readonly useCase: GetMeetingParticipantsUseCase,

    @inject(MeetingEnrollmentDetailedPresenter)
    private readonly meetingEnrollmentDetailedPresenter: MeetingEnrollmentDetailedPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ params: GetMeetingParticipantsParamsType; querystring: GetMeetingParticipantsQueryType }>,
    reply: FastifyReply,
  ) {
    const { meetingPublicId } = request.params
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute({
      ...parsedQuery,
      meetingPublicId,
    })

    const formattedReply = this.meetingEnrollmentDetailedPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
