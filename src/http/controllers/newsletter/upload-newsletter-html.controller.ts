import type { FileInput, HTTPFile } from '@custom-types/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { newsletterHtmlMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@presenters/file-presenter'
import { fileSchema } from '@schemas/utils/generic-components/file-schema'
import { UploadNewsletterHtmlUseCase } from '@use-cases/newsletters/upload-newsletter-html'
import { container } from 'tsyringe'

export async function uploadNewsletterHtml(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(newsletterHtmlMultipartFileConfig)

  fileSchema.parse(filePart)

  const useCase = container.resolve(UploadNewsletterHtmlUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
