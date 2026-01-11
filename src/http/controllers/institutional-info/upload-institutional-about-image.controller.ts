import type { FileInput, HTTPFile } from '@custom-types/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { institutionalAboutImageFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@presenters/file-presenter'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadInstitutionalAboutImageUseCase } from '@use-cases/institutional-info/upload-institutional-about-image'
import { container } from 'tsyringe'

export async function uploadInstitutionalAboutImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(institutionalAboutImageFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadInstitutionalAboutImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(201).send({
    data: formattedReply,
  })
}
