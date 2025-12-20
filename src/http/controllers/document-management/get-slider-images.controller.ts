import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetSliderImagesUseCase } from '@use-cases/document-management/get-slider-images'
import { container } from 'tsyringe'
import { z } from 'zod'

const getSliderImagesQuerySchema = z.object({
  includeInactive: z.coerce.boolean().optional().default(false),
})

export async function getSliderImages(request: FastifyRequest, reply: FastifyReply) {
  const { includeInactive } = getSliderImagesQuerySchema.parse(request.query)

  const useCase = container.resolve(GetSliderImagesUseCase)

  const result = await useCase.execute({ includeInactive })

  return await reply.status(200).send(result)
}
