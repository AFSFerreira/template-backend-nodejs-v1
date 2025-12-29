import type {
  HTTPMeetingParticipationDetailed,
  MeetingParticipationPresenterInput,
} from '@custom-types/presenter/meeting-participation/meeting-participation-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { MEETING_PARTICIPATION_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { MeetingParticipationPresenter } from '@presenters/variants/meeting-participation-presenter'
import { getMeetingParticipantsParamsSchema } from '@schemas/meeting/get-meeting-participants-params-schema'
import { getMeetingParticipantsQuerySchema } from '@schemas/meeting/get-meeting-participants-query-schema'
import { GetMeetingParticipantsUseCase } from '@use-cases/meeting/get-meeting-participants'
import { container } from 'tsyringe'

export async function getMeetingParticipants(request: FastifyRequest, reply: FastifyReply) {
  const { meetingPublicId } = getMeetingParticipantsParamsSchema.parse(request.params)
  const parsedQuery = getMeetingParticipantsQuerySchema.parse(request.query)

  const useCase = container.resolve(GetMeetingParticipantsUseCase)

  const { data, meta } = await useCase.execute({
    ...parsedQuery,
    meetingPublicId,
  })

  return await reply.status(200).send({
    data: MeetingParticipationPresenter.toHTTP<MeetingParticipationPresenterInput, HTTPMeetingParticipationDetailed>(
      data,
      MEETING_PARTICIPATION_DETAILED_PRESENTER_KEY,
    ),
    meta,
  })
}
