import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterUserMeetingBodyType } from '@custom-types/http/schemas/meeting/register-user-meeting-body-schema'
import type { RegisterUserMeetingParamsType } from '@custom-types/http/schemas/meeting/register-user-meeting-params-schema'
import type { FastifyReply } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { RegisterUserMeetingUseCase } from '@use-cases/meeting/register-user-meeting'
import { container } from 'tsyringe'

export async function registerUserMeeting(
  request: ZodRequest<{ body: RegisterUserMeetingBodyType; params: RegisterUserMeetingParamsType }>,
  reply: FastifyReply,
) {
  const { meetingId } = request.params
  const userPublicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
  const parsedBody = request.body

  const useCase = container.resolve(RegisterUserMeetingUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
    meetingId,
  })

  return await reply.status(201).send()
}
