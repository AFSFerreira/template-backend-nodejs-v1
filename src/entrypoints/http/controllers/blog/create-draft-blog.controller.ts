import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { CreateBlogBodyType } from '@custom-types/http/schemas/blog/create-blog-body-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { CreateDraftBlogUseCase } from '@use-cases/blog/create-draft-blog'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function createDraftBlog(request: ZodRequest<{ body: CreateBlogBodyType }>, reply: FastifyReply) {
  const authorPublicId = getRequestUserPublicId(request)
  const parsedBody = request.body

  const useCase = container.resolve(CreateDraftBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedBody,
    authorPublicId,
  })

  return await reply.status(StatusCodes.CREATED).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
