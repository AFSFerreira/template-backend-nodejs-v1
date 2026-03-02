import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateSliderImageParamsSchema } from '@http/schemas/slider-image/update-slider-image-params-schema'
import { DeleteSliderImageUseCase } from '@use-cases/slider-image/delete-slider-image'
import { container } from 'tsyringe'

export async function deleteSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = updateSliderImageParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteSliderImageUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
