import type { FastifyReply, FastifyRequest } from 'fastify'
import { profilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadBlogBannerUseCase } from '@use-cases/blogs/upload-blog-banner'
import { container } from 'tsyringe'

export async function uploadBlogBanner(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(profilePictureFileConfig)

  const { filename: originalFilename } = imageSchema.parse(filePart)

  const useCase = container.resolve(UploadBlogBannerUseCase)

  const { filename } = await useCase.execute({ originalFilename, filePart })

  return await reply.status(200).send({ data: { blogBanner: filename } })
}
