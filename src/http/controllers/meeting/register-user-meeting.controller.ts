import { MeetingParticipationPresenter } from '@presenters/meeting-participation-presenter'
import { registerUserMeetingBodySchema } from '@schemas/meeting/register-user-meeting-body-schema'
import { registerUserMeetingParamsSchema } from '@schemas/meeting/register-user-meeting-params-schema'
import { makeRegisterUserMeetingUseCase } from '@use-cases/factories/meeting/make-register-user-meeting-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface RegisterUserMeetingParams {
  meetingId: string
}

interface RegisterUserMeetingRequest extends FastifyRequest<{
  Params: RegisterUserMeetingParams
}> {}

export async function registerUserMeeting(request: RegisterUserMeetingRequest, reply: FastifyReply) {
  const { meetingId } = registerUserMeetingParamsSchema.parse(request.params)
  const { sub: userId } = request.user
  const parsedBody = registerUserMeetingBodySchema.parse(request.body)

  const registerUserMeetingUseCase = makeRegisterUserMeetingUseCase()

  const { meetingParticipation } = await registerUserMeetingUseCase.execute({
    ...parsedBody,
    userId,
    meetingId,
  })

  return await reply.status(201).send({
    data: MeetingParticipationPresenter.toHTTP(meetingParticipation),
  })
}
