import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SliderImagePresenter } from '@presenters/slider-image-presenter'
import { getAllHomePageSlidersSchema } from '@schemas/slider-image/get-all-home-page-sliders-schema'
import { GetAllHomePageSlidersUseCase } from '@use-cases/slider-image/get-all-home-page-sliders'
import { container } from 'tsyringe'

export async function getAllHomePageSliders(request: FastifyRequest, reply: FastifyReply) {
  const parsedQuery = getAllHomePageSlidersSchema.parse(request.query)

  const useCase = container.resolve(GetAllHomePageSlidersUseCase)

  const { data, meta } = await useCase.execute(parsedQuery)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImage, HTTPSliderImage>(
    data,
    tokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.status(200).send({ data: formattedReply, meta })
}
