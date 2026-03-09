import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterGuestMeetingBodyType } from '@custom-types/http/schemas/meeting/register-guest-meeting-body-schema'
import type { RegisterGuestMeetingParamsType } from '@custom-types/http/schemas/meeting/register-guest-meeting-params-schema'
import type { FastifyReply } from 'fastify'
import { RegisterGuestMeetingUseCase } from '@use-cases/meeting/register-guest-meeting'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function registerGuestMeeting(
  request: ZodRequest<{ body: RegisterGuestMeetingBodyType; params: RegisterGuestMeetingParamsType }>,
  reply: FastifyReply,
) {
  const { meetingId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(RegisterGuestMeetingUseCase)

  await useCase.execute({
    ...parsedBody,
    meetingId,
  })

  return await reply.sendResponse(undefined, StatusCodes.CREATED)
}
