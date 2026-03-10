import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllHomePageSlidersType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import type { FastifyReply } from 'fastify'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllHomePageSlidersController implements IController {
  constructor(private useCase: GetAllHomePageSlidersUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllHomePageSlidersType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = SliderImageDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
