import type {
  HTTPMeetingEnrollmentDetailed,
  MeetingEnrollmentPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { MeetingEnrollmentPresenter } from '@http/presenters/meeting-enrollment-presenter'
import { getMeetingParticipantsParamsSchema } from '@http/schemas/meeting/get-meeting-participants-params-schema'
import { getMeetingParticipantsQuerySchema } from '@http/schemas/meeting/get-meeting-participants-query-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
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

  const formattedReply = MeetingEnrollmentPresenter.toHTTP<
    MeetingEnrollmentPresenterInput,
    HTTPMeetingEnrollmentDetailed
  >(data, tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDetailedWithPresentation)

  return await reply.status(200).send({ data: formattedReply, meta })
}
