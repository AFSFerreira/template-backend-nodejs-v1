import { registerUserMeetingBodySchema } from '@schemas/meeting/register-user-meeting-body-schema'
import { registerUserMeetingParamsSchema } from '@schemas/meeting/register-user-meeting-params-schema'
import { makeRegisterUserMeetingUseCase } from '@use-cases/factories/meeting/make-register-user-meeting-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerUserMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerUserMeetingParamsSchema.parse(request.params)
  const { sub: userId } = request.user
  const parsedBody = registerUserMeetingBodySchema.parse(request.body)

  const registerUserMeetingUseCase = makeRegisterUserMeetingUseCase()

  await registerUserMeetingUseCase.execute({
    ...parsedBody,
    userId,
    meetingId,
  })

  return await reply.status(201).send()
}
