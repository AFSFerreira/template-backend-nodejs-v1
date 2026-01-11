import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { SliderImagePresenter } from '@presenters/slider-image-presenter'
import { updateSliderImageBodySchema } from '@schemas/slider-image/update-slider-image-body-schema'
import { updateSliderImageParamsSchema } from '@schemas/slider-image/update-slider-image-params-schema'
import { UpdateSliderImageUseCase } from '@use-cases/slider-image/update-slider-image'
import { container } from 'tsyringe'

export async function updateSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateSliderImageParamsSchema.parse(request.params)
  const parsedBody = updateSliderImageBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateSliderImageUseCase)

  const { sliderImage } = await useCase.execute({ publicId, data: parsedBody })

  const formattedReply = SliderImagePresenter.toHTTP<SliderImage, HTTPSliderImage>(sliderImage)

  return await reply.status(200).send({ data: formattedReply })
}
