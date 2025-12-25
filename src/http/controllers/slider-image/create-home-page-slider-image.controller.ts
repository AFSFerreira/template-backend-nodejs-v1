import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY } from '@constants/presenters-constants'
import { SliderImagePresenter } from '@presenters/variants/slider-image'
import { createHomePageSliderImageBodySchema } from '@schemas/slider-image/create-home-page-slider-image-body-schema'
import { CreateHomePageSliderImageUseCase } from '@use-cases/slider-image/create-home-page-slider-image-use-case'
import { container } from 'tsyringe'

export async function createHomePageSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = createHomePageSliderImageBodySchema.parse(request.body)

  const useCase = container.resolve(CreateHomePageSliderImageUseCase)

  const { sliderImage } = await useCase.execute(parsedBody)

  return await reply.status(201).send({
    data: {
      sliderImage: SliderImagePresenter.toHTTP<SliderImage, HTTPSliderImage>(
        sliderImage,
        HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY,
      ),
    },
  })
}
