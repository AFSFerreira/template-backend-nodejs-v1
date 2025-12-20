import type { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateSliderImageUseCase } from '@use-cases/document-management/update-slider-image'
import { container } from 'tsyringe'
import { z } from 'zod'

const updateSliderImageParamsSchema = z.object({
  id: z.coerce.number(),
})

const updateSliderImageBodySchema = z.object({
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  link: z.string().url().optional().nullable(),
})

export async function updateSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const { id } = updateSliderImageParamsSchema.parse(request.params)
  const { order, isActive, link } = updateSliderImageBodySchema.parse(request.body)

  const useCase = container.resolve(UpdateSliderImageUseCase)

  const result = await useCase.execute({ id, order, isActive, link })

  return await reply.status(200).send(result)
}
