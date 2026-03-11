import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateHomePageSliderImageBodyType } from '@custom-types/http/schemas/slider-image/create-home-page-slider-image-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { CreateHomePageSliderImageUseCase } from '@use-cases/slider-image/create-home-page-slider-image-use-case'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateHomePageSliderImageController implements IController {
  constructor(
    @inject(CreateHomePageSliderImageUseCase)
    private readonly useCase: CreateHomePageSliderImageUseCase,

    @inject(SliderImageDefaultPresenter)
    private readonly sliderImageDefaultPresenter: SliderImageDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateHomePageSliderImageBodyType }>, reply: FastifyReply) {
    const parsedBody = request.body
    const { sliderImage } = await this.useCase.execute(parsedBody)

    const formattedReply = this.sliderImageDefaultPresenter.toHTTP(sliderImage)

    return await reply.sendResponse({ sliderImage: formattedReply }, StatusCodes.CREATED)
  }
}
