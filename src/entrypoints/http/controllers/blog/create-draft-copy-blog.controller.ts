import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateDraftCopyBlogParamsType } from '@custom-types/http/schemas/blog/create-draft-copy-blog-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { CreateDraftCopyBlogUseCase } from '@use-cases/blog/create-draft-copy-blog'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateDraftCopyBlogController implements IController {
  constructor(
    @inject(CreateDraftCopyBlogUseCase)
    private readonly useCase: CreateDraftCopyBlogUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: CreateDraftCopyBlogParamsType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const parsedParams = request.params
    const { blog } = await this.useCase.execute({
      ...parsedParams,
      userPublicId,
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
