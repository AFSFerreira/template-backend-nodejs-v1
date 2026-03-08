import type { ZodRequest } from '@custom-types/custom/zod-request'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import type { UpdateSliderImageBodyType } from '@custom-types/http/schemas/slider-image/update-slider-image-body-schema'
import type { UpdateSliderImageParamsType } from '@custom-types/http/schemas/slider-image/update-slider-image-params-schema'
import type { FastifyReply } from 'fastify'
import { SliderImagePresenter } from '@http/presenters/slider-image-presenter'
import { UpdateSliderImageUseCase } from '@use-cases/slider-image/update-slider-image'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function updateSliderImage(
  request: ZodRequest<{ body: UpdateSliderImageBodyType; params: UpdateSliderImageParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params
  const parsedBody = request.body

  const useCase = container.resolve(UpdateSliderImageUseCase)

  const { sliderImage } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = SliderImagePresenter.toHTTP<SliderImageDefaultPresenterInput, HTTPSliderImage>(sliderImage)

  return await reply.status(StatusCodes.OK).send({ data: formattedReply })
}
