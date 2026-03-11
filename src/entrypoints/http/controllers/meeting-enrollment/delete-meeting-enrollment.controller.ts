import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteMeetingEnrollmentParamsType } from '@custom-types/http/schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteMeetingEnrollmentUseCase } from '@use-cases/meeting-enrollment/delete-meeting-enrollment'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DeleteMeetingEnrollmentController implements IController {
  constructor(
    @inject(DeleteMeetingEnrollmentUseCase)
    private readonly useCase: DeleteMeetingEnrollmentUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteMeetingEnrollmentParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
