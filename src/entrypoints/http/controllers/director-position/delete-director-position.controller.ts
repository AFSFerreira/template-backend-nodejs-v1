import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteDirectorPositionParamsType } from '@custom-types/http/schemas/director-position/delete-director-position-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteDirectorPositionUseCase } from '@use-cases/director-position/delete-director-position'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DeleteDirectorPositionController implements IController {
  constructor(
    @inject(DeleteDirectorPositionUseCase)
    private readonly useCase: DeleteDirectorPositionUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteDirectorPositionParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
