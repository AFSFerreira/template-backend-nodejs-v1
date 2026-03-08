import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPMeetingEnrollmentDetailed,
  MeetingEnrollmentPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed'
import type { GetMeetingParticipantsParamsType } from '@custom-types/http/schemas/meeting/get-meeting-participants-params-schema'
import type { GetMeetingParticipantsQueryType } from '@custom-types/http/schemas/meeting/get-meeting-participants-query-schema'
import type { FastifyReply } from 'fastify'
import { MeetingEnrollmentPresenter } from '@http/presenters/meeting-enrollment-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetMeetingParticipantsUseCase } from '@use-cases/meeting/get-meeting-participants'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getMeetingParticipants(
  request: ZodRequest<{ params: GetMeetingParticipantsParamsType; querystring: GetMeetingParticipantsQueryType }>,
  reply: FastifyReply,
) {
  const { meetingPublicId } = request.params
  const parsedQuery = request.query

  const useCase = container.resolve(GetMeetingParticipantsUseCase)

  const { data, meta } = await useCase.execute({
    ...parsedQuery,
    meetingPublicId,
  })

  const formattedReply = MeetingEnrollmentPresenter.toHTTP<
    MeetingEnrollmentPresenterInput,
    HTTPMeetingEnrollmentDetailed
  >(data, tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDetailedWithPresentation)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply, meta })
}
