import { MeetingParticipationPresenter } from '@presenters/meeting-participation-presenter'
import { registerGuestMeetingBodySchema } from '@schemas/meeting/register-guest-meeting-body-schema'
import { registerGuestMeetingParamsSchema } from '@schemas/meeting/register-guest-meeting-params-schema'
import { makeRegisterGuestMeetingUseCase } from '@use-cases/factories/meeting-participation/make-register-guest-meeting-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerGuestMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerGuestMeetingParamsSchema.parse(request.params)
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
