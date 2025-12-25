import type { FastifyReply, FastifyRequest } from 'fastify'
import { profilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadBlogImageUseCase } from '@use-cases/blogs/upload-blog-image'
import { container } from 'tsyringe'

export async function uploadBlogImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(profilePictureFileConfig)

  const { filename: originalFilename } = imageSchema.parse(filePart)

  const useCase = container.resolve(UploadBlogImageUseCase)

  const { filename } = await useCase.execute({ originalFilename, filePart })

  return await reply.status(200).send({ data: { blogImage: filename } })
}
