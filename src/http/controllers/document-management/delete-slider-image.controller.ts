import type { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteSliderImageUseCase } from '@use-cases/document-management/delete-slider-image'
import { container } from 'tsyringe'
import { z } from 'zod'

const deleteSliderImageParamsSchema = z.object({
  id: z.coerce.number(),
})

export async function deleteSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const { id } = deleteSliderImageParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteSliderImageUseCase)

  await useCase.execute({ id })

  return await reply.status(204).send()
}
