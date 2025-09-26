import { MeetingParticipationPresenter } from '@presenters/meeting-participation-presenter'
import { registerGuestMeetingBodySchema } from '@schemas/meeting/register-guest-meeting-body-schema'
import { makeRegisterGuestMeetingUseCase } from '@use-cases/factories/meeting-participation/make-register-guest-meeting-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface RegisterGuestMeetingParams {
  meetingId: string
}

export async function registerGuestMeeting(request: FastifyRequest<{ Params: RegisterGuestMeetingParams }>, reply: FastifyReply) {
  const { meetingId } = request.params
  const parsedBody = registerGuestMeetingBodySchema.parse(request.body)

  const registerGuestMeetingUseCase = makeRegisterGuestMeetingUseCase()

  const { meetingParticipation } = await registerGuestMeetingUseCase.execute({
    ...parsedBody,
    meetingId,
  })

  return await reply.status(201).send({
    data: MeetingParticipationPresenter.toHTTP(meetingParticipation),
  })
}
