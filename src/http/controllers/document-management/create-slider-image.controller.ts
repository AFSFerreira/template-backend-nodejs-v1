import type { FastifyReply, FastifyRequest } from 'fastify'
import { sliderImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { CreateSliderImageUseCase } from '@use-cases/document-management/create-slider-image'
import { container } from 'tsyringe'

export async function createSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const file = await request.file(sliderImageMultipartFileConfig)

  if (!file) {
    return await reply.status(400).send({ error: 'No file uploaded' })
  }

  const useCase = container.resolve(CreateSliderImageUseCase)

  const result = await useCase.execute({ file })

  return await reply.status(201).send(result)
}
