import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RegisterUserMeetingBodyType } from '@custom-types/http/schemas/meeting/register-user-meeting-body-schema'
import type { RegisterUserMeetingParamsType } from '@custom-types/http/schemas/meeting/register-user-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { RegisterUserMeetingUseCase } from '@use-cases/meeting/register-user-meeting'
import type { FastifyReply } from 'fastify'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'tsyringe'

@injectable()
export class RegisterUserMeetingController implements IController {
  constructor(private useCase: RegisterUserMeetingUseCase) {}

  async handle(
    request: ZodRequest<{ body: RegisterUserMeetingBodyType; params: RegisterUserMeetingParamsType }>,
    reply: FastifyReply,
  ) {
    const { meetingId } = request.params
    const userPublicId = modelPublicIdSchema.parse(getRequestUserPublicId(request))
    const parsedBody = request.body
    await this.useCase.execute({
      ...parsedBody,
      userPublicId,
      meetingId,
    })

    return await reply.sendResponse(undefined, StatusCodes.CREATED)
  }
}
