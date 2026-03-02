import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerGuestMeetingBodySchema } from '@http/schemas/meeting/register-guest-meeting-body-schema'
import { registerGuestMeetingParamsSchema } from '@http/schemas/meeting/register-guest-meeting-params-schema'
import { RegisterGuestMeetingUseCase } from '@use-cases/meeting/register-guest-meeting'
import { container } from 'tsyringe'

export async function registerGuestMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerGuestMeetingParamsSchema.parse(request.params)
  const parsedBody = registerGuestMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(RegisterGuestMeetingUseCase)

  await useCase.execute({
    ...parsedBody,
    meetingId,
  })

  return await reply.status(201).send()
}
