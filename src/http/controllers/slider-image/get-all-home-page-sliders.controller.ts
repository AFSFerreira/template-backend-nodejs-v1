import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY } from '@constants/presenters-constants'
import { SliderImagePresenter } from '@presenters/variants/slider-image'
import { getAllHomePageSlidersSchema } from '@schemas/slider-image/get-all-home-page-sliders-schema'
import { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import { container } from 'tsyringe'

export async function getAllHomePageSliders(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllHomePageSlidersSchema.parse(request.query)

  const useCase = container.resolve(GetAllHomePageSlidersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  return await reply.status(200).send({
    data: SliderImagePresenter.toHTTP<SliderImage, HTTPSliderImage>(data, HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY),
    meta,
  })
}
