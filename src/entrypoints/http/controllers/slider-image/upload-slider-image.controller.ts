import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { sliderImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadSliderImageUseCase } from '@use-cases/slider-image/upload-slider-image'
import { container } from 'tsyringe'

export async function uploadSliderImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(sliderImageMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadSliderImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(201).send({
    data: formattedReply,
  })
}
