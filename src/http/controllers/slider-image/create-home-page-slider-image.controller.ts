import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SliderImagePresenter } from '@presenters/variants/slider-image-presenter'
import { createHomePageSliderImageBodySchema } from '@schemas/slider-image/create-home-page-slider-image-body-schema'
import { CreateHomePageSliderImageUseCase } from '@use-cases/slider-image/create-home-page-slider-image-use-case'
import { container } from 'tsyringe'

export async function createHomePageSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createHomePageSliderImageBodySchema.parse(request.body)

  const useCase = container.resolve(CreateHomePageSliderImageUseCase)

  const { sliderImage } = await useCase.execute(parsedBody)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImage, HTTPSliderImage>(
    sliderImage,
    tokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.status(201).send({ data: { sliderImage: formattedReply } })
}
