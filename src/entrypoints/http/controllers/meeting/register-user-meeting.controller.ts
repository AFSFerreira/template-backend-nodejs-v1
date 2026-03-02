import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserMeetingBodySchema } from '@http/schemas/meeting/register-user-meeting-body-schema'
import { registerUserMeetingParamsSchema } from '@http/schemas/meeting/register-user-meeting-params-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { RegisterUserMeetingUseCase } from '@use-cases/meeting/register-user-meeting'
import { container } from 'tsyringe'

export async function registerUserMeeting(request: FastifyRequest, reply: FastifyReply) {
  const { meetingId } = registerUserMeetingParamsSchema.parse(request.params)
  const userPublicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
  const parsedBody = registerUserMeetingBodySchema.parse(request.body)

  const useCase = container.resolve(RegisterUserMeetingUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
    meetingId,
  })

  return await reply.status(201).send()
}
