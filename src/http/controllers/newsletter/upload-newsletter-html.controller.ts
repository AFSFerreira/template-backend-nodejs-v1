import type { FastifyReply, FastifyRequest } from 'fastify'
import { profilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { fileSchema } from '@schemas/utils/generic-components/file-schema'
import { UploadNewsletterHtmlUseCase } from '@use-cases/newsletters/upload-newsletter-html'
import { container } from 'tsyringe'

export async function uploadNewsletterHtml(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(profilePictureFileConfig)

  const { filename: originalFilename } = fileSchema.parse(filePart)

  const useCase = container.resolve(UploadNewsletterHtmlUseCase)

  const { filename } = await useCase.execute({ originalFilename, filePart })

  return await reply.status(200).send({ data: { htmlFileName: filename } })
}
