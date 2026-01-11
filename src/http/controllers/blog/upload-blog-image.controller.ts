import type { FileInput, HTTPFile } from '@custom-types/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { blogImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@presenters/file-presenter'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadBlogImageUseCase } from '@use-cases/blogs/upload-blog-image'
import { container } from 'tsyringe'

export async function uploadBlogImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(blogImageMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadBlogImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
