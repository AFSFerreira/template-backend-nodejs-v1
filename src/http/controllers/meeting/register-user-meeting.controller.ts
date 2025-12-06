import { registerUserMeetingBodySchema } from '@schemas/meeting/register-user-meeting-body-schema'
import { registerUserMeetingParamsSchema } from '@schemas/meeting/register-user-meeting-params-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { RegisterUserMeetingUseCase } from '@use-cases/meeting/register-user-meeting'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function registerUserMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerUserMeetingParamsSchema.parse(request.params)
  const userPublicId = modelPublicIdSchema.parse(request.user.sub)
  const parsedBody = registerUserMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(RegisterUserMeetingUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
    meetingId,
  })

  return await reply.status(201).send()
}
