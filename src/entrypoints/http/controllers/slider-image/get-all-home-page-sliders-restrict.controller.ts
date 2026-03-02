import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { SliderImagePresenter } from '@presenters/slider-image-presenter'
import { getAllHomePageSlidersRestrictSchema } from '@schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import { GetAllHomePageSlidersRestrictUseCase } from '@use-cases/slider-image/get-all-home-page-sliders-restrict'
import { container } from 'tsyringe'

export async function getAllHomePageSlidersRestrict(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllHomePageSlidersRestrictSchema.parse(request.query)

  const useCase = container.resolve(GetAllHomePageSlidersRestrictUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImageDefaultPresenterInput, HTTPSliderImage>(
    data,
    tsyringeTokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
