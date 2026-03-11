import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllHomePageSlidersType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllHomePageSlidersController implements IController {
  constructor(
    @inject(GetAllHomePageSlidersUseCase)
    private readonly useCase: GetAllHomePageSlidersUseCase,

    @inject(SliderImageDefaultPresenter)
    private readonly sliderImageDefaultPresenter: SliderImageDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllHomePageSlidersType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.sliderImageDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
