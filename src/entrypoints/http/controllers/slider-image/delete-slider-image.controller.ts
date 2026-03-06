import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteSliderImageParamsType } from '@custom-types/http/schemas/slider-image/delete-slider-image-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteSliderImageUseCase } from '@use-cases/slider-image/delete-slider-image'
import { container } from 'tsyringe'

export async function deleteSliderImage(
  request: ZodRequest<{ params: DeleteSliderImageParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteSliderImageUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}
