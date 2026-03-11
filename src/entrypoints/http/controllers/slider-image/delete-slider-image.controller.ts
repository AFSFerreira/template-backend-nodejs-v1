import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteSliderImageParamsType } from '@custom-types/http/schemas/slider-image/delete-slider-image-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { DeleteSliderImageUseCase } from '@use-cases/slider-image/delete-slider-image'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteSliderImageController implements IController {
  constructor(
    @inject(DeleteSliderImageUseCase)
    private readonly useCase: DeleteSliderImageUseCase,
  ) {}

  async handle(request: ZodRequest<{ params: DeleteSliderImageParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    await this.useCase.execute({ publicId })

    return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
  }
}
