import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { CreateBlogBodyType } from '@custom-types/http/schemas/blog/create-blog-body-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { CreatePendingBlogUseCase } from '@use-cases/blog/create-pending-blog'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { StatusCodes } from 'http-status-codes'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreatePendingBlogController implements IController {
  constructor(
    @inject(CreatePendingBlogUseCase)
    private readonly useCase: CreatePendingBlogUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: CreateBlogBodyType }>, reply: FastifyReply) {
    const authorPublicId = getRequestUserPublicId(request)
    const parsedBody = request.body
    const { blog } = await this.useCase.execute({
      ...parsedBody,
      authorPublicId,
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
  }
}
