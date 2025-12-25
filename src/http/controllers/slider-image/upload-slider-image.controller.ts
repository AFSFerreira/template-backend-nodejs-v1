import type { FastifyReply, FastifyRequest } from 'fastify'
import { sliderImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadSliderImageUseCase } from '@use-cases/slider-image/upload-slider-image'
import { container } from 'tsyringe'

export async function uploadSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(sliderImageMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadSliderImageUseCase)

  const result = await useCase.execute({ filePart })

  return await reply.status(201).send({
    data: { sliderImage: result },
  })
}
