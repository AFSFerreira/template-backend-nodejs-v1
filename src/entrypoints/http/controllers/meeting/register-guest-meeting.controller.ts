import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterGuestMeetingBodyType } from '@custom-types/http/schemas/meeting/register-guest-meeting-body-schema'
import type { RegisterGuestMeetingParamsType } from '@custom-types/http/schemas/meeting/register-guest-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { RegisterGuestMeetingUseCase } from '@use-cases/meeting/register-guest-meeting'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterGuestMeetingController implements IController {
  constructor(
    @inject(RegisterGuestMeetingUseCase)
    private readonly useCase: RegisterGuestMeetingUseCase,
  ) {}

  async handle(
    request: ZodRequest<{ body: RegisterGuestMeetingBodyType; params: RegisterGuestMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { meetingId } = request.params
    await this.useCase.execute({
      ...request.body,
      meetingId,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
