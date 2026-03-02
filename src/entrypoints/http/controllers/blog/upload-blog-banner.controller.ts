import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { blogBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { FilePresenter } from '@presenters/file-presenter'
import { UploadBlogBannerUseCase } from '@use-cases/blog/upload-blog-banner'
import { container } from 'tsyringe'

export async function uploadBlogBanner(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(blogBannerMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadBlogBannerUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
