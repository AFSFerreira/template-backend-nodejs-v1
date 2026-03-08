import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import type { GetAllHomePageSlidersType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-schema'
import type { FastifyReply } from 'fastify'
import { SliderImagePresenter } from '@http/presenters/slider-image-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import { container } from 'tsyringe'

export async function getAllHomePageSliders(
  request: ZodRequest<{ querystring: GetAllHomePageSlidersType }>,
  reply: FastifyReply,
) {
  const parsedQuery = request.query

  const useCase = container.resolve(GetAllHomePageSlidersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImageDefaultPresenterInput, HTTPSliderImage>(
    data,
    tsyringeTokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.sendPaginated(formattedReply, meta)
}
