import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllHomePageSlidersRestrictType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { GetAllHomePageSlidersRestrictUseCase } from '@use-cases/slider-image/get-all-home-page-sliders-restrict'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllHomePageSlidersRestrictController implements IController {
  constructor(
    @inject(GetAllHomePageSlidersRestrictUseCase)
    private readonly useCase: GetAllHomePageSlidersRestrictUseCase,

    @inject(SliderImageDefaultPresenter)
    private readonly sliderImageDefaultPresenter: SliderImageDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllHomePageSlidersRestrictType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.sliderImageDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
