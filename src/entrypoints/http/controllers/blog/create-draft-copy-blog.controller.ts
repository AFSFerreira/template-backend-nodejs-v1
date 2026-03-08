import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { CreateDraftCopyBlogParamsType } from '@custom-types/http/schemas/blog/create-draft-copy-blog-params-schema'
import type { FastifyReply } from 'fastify'
import { BlogPresenter } from '@http/presenters/blog-presenter'
import { CreateDraftCopyBlogUseCase } from '@use-cases/blog/create-draft-copy-blog'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function createDraftCopyBlog(
  request: ZodRequest<{ params: CreateDraftCopyBlogParamsType }>,
  reply: FastifyReply,
) {
  const userPublicId = getRequestUserPublicId(request)
  const parsedParams = request.params

  const useCase = container.resolve(CreateDraftCopyBlogUseCase)

  const { blog } = await useCase.execute({
    ...parsedParams,
    userPublicId,
  })

  return await reply.status(StatusCodes.CREATED).send({
    data: BlogPresenter.toHTTP<BlogDefaultPresenterInput, HTTPBlog>(blog),
  })
}
