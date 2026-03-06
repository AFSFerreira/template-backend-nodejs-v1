import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import type { CreateHomePageSliderImageBodyType } from '@custom-types/http/schemas/slider-image/create-home-page-slider-image-body-schema'
import type { FastifyReply } from 'fastify'
import { SliderImagePresenter } from '@http/presenters/slider-image-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { CreateHomePageSliderImageUseCase } from '@use-cases/slider-image/create-home-page-slider-image-use-case'
import { container } from 'tsyringe'

export async function createHomePageSliderImage(
  request: ZodRequest<{ body: CreateHomePageSliderImageBodyType }>,
  reply: FastifyReply,
) {
  const parsedBody = request.body

  const useCase = container.resolve(CreateHomePageSliderImageUseCase)

  const { sliderImage } = await useCase.execute(parsedBody)

  const formattedReply = SliderImagePresenter.toHTTP<SliderImageDefaultPresenterInput, HTTPSliderImage>(
    sliderImage,
    tsyringeTokens.presenters.sliderImage.sliderImageHomePage,
  )

  return await reply.status(201).send({ data: { sliderImage: formattedReply } })
}
