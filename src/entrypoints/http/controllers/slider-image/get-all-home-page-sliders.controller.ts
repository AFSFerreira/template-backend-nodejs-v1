import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { SliderImagePresenter } from '@http/presenters/slider-image-presenter'
import { getAllHomePageSlidersSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-schema'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import { container } from 'tsyringe'

export async function getAllHomePageSliders(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllHomePageSlidersSchema.parse(request.query)

  const useCase = container.resolve(GetAllHomePageSlidersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImageDefaultPresenterInput, HTTPSliderImage>(
    data,
    tsyringeTokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
