import { registerGuestMeetingBodySchema } from '@schemas/meeting/register-guest-meeting-body-schema'
import { registerGuestMeetingParamsSchema } from '@schemas/meeting/register-guest-meeting-params-schema'
import { makeRegisterGuestMeetingUseCase } from '@use-cases/factories/meeting/make-register-guest-meeting-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerGuestMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerGuestMeetingParamsSchema.parse(request.params)
  const parsedBody = registerGuestMeetingBodySchema.parse(request.body)

  const registerGuestMeetingUseCase = makeRegisterGuestMeetingUseCase()

  await registerGuestMeetingUseCase.execute({
    ...parsedBody,
    meetingId,
  })

  return await reply.status(201).send()
}
