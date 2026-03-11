import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteMeetingParamsType } from '@custom-types/http/schemas/meeting/delete-meeting-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteMeetingUseCase } from '@use-cases/meeting/delete-meeting'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DeleteMeetingController implements IController {
  constructor(
    @inject(DeleteMeetingUseCase)
    private readonly useCase: DeleteMeetingUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteMeetingParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
