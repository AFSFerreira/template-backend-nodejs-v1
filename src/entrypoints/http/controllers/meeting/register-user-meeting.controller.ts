import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterUserMeetingBodyType } from '@custom-types/http/schemas/meeting/register-user-meeting-body-schema'
import type { RegisterUserMeetingParamsType } from '@custom-types/http/schemas/meeting/register-user-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { RegisterUserMeetingUseCase } from '@use-cases/meeting/register-user-meeting'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterUserMeetingController implements IController {
  constructor(
    @inject(RegisterUserMeetingUseCase)
    private readonly useCase: RegisterUserMeetingUseCase,
  ) {}

  async handle(
    request: ZodRequest<{ body: RegisterUserMeetingBodyType; params: RegisterUserMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { meetingId } = request.params
    await this.useCase.execute({
      ...request.body,
      userPublicId: modelPublicIdSchema.parse(getRequestUserPublicId(request)),
      meetingId,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
