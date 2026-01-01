import type {
  HTTPMeetingEnrollmentDetailed,
  MeetingEnrollmentPresenterInput,
} from '@custom-types/presenter/meeting-enrollment/meeting-enrollment-detailed'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingEnrollmentPresenter } from '@presenters/variants/meeting-enrollment-presenter'
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

  const formattedReply = MeetingEnrollmentPresenter.toHTTP<
    MeetingEnrollmentPresenterInput,
    HTTPMeetingEnrollmentDetailed
  >(data, tokens.presenters.meetingEnrollmentDetailed)

  return await reply.status(200).send({ data: formattedReply, meta })
}
