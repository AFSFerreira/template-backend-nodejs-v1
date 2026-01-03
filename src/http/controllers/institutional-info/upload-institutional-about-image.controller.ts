import type { FastifyReply, FastifyRequest } from 'fastify'
import { institutionalAboutImageFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadInstitutionalAboutImageUseCase } from '@use-cases/institutional-info/upload-institutional-about-image'
import { container } from 'tsyringe'

export async function uploadInstitutionalAboutImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(institutionalAboutImageFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadInstitutionalAboutImageUseCase)

  const { filename, publicUrl } = await useCase.execute({ filePart })

  return await reply.status(201).send({
    data: { filename, publicUrl },
  })
}
