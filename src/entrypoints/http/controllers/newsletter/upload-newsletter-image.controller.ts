import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { newsletterImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadNewsletterImageUseCase } from '@use-cases/newsletters/upload-newsletter-image'
import { container } from 'tsyringe'

export async function uploadNewsletterImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(newsletterImageMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadNewsletterImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
