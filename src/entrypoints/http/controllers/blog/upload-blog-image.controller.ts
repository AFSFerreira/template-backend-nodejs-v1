import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { blogImageMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadBlogImageUseCase } from '@use-cases/blog/upload-blog-image'
import { container } from 'tsyringe'

export async function uploadBlogImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(blogImageMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadBlogImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
