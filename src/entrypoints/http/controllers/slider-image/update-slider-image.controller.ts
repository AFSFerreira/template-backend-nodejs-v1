import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateSliderImageBodyType } from '@custom-types/http/schemas/slider-image/update-slider-image-body-schema'
import type { UpdateSliderImageParamsType } from '@custom-types/http/schemas/slider-image/update-slider-image-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { UpdateSliderImageUseCase } from '@use-cases/slider-image/update-slider-image'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateSliderImageController implements IController {
  constructor(
    @inject(UpdateSliderImageUseCase)
    private readonly useCase: UpdateSliderImageUseCase,

    @inject(SliderImageDefaultPresenter)
    private readonly sliderImageDefaultPresenter: SliderImageDefaultPresenter,
  ) {}

  async handle(
    request: ZodRequest<{ body: UpdateSliderImageBodyType; params: UpdateSliderImageParamsType }>,
    reply: FastifyReply,
  ) {
    const { publicId } = request.params
    const parsedBody = request.body
    const { sliderImage } = await this.useCase.execute({ publicId, data: parsedBody })

    const formattedReply = this.sliderImageDefaultPresenter.toHTTP(sliderImage)

    return await reply.sendResponse(formattedReply)
  }
}
