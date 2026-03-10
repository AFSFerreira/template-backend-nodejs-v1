import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterGuestMeetingBodyType } from '@custom-types/http/schemas/meeting/register-guest-meeting-body-schema'
import type { RegisterGuestMeetingParamsType } from '@custom-types/http/schemas/meeting/register-guest-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { RegisterGuestMeetingUseCase } from '@use-cases/meeting/register-guest-meeting'
import type { FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class RegisterGuestMeetingController implements IController {
  constructor(private useCase: RegisterGuestMeetingUseCase) {}

  async handle(
    request: ZodRequest<{ body: RegisterGuestMeetingBodyType; params: RegisterGuestMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { meetingId } = request.params
    const parsedBody = request.body
    await this.useCase.execute({
      ...parsedBody,
      meetingId,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
