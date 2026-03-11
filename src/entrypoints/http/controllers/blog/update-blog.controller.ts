import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { UpdateBlogBodyType } from '@custom-types/http/schemas/blog/update-blog-body-schema'
import type { UpdateBlogParamsType } from '@custom-types/http/schemas/blog/update-blog-params-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDefaultPresenter } from '@http/presenters/blog/blog-default.presenter'
import { UpdateBlogUseCase } from '@use-cases/blog/update-blog'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateBlogController implements IController {
  constructor(
    @inject(UpdateBlogUseCase)
    private readonly useCase: UpdateBlogUseCase,

    @inject(BlogDefaultPresenter)
    private readonly blogDefaultPresenter: BlogDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ body: UpdateBlogBodyType; params: UpdateBlogParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { blog } = await this.useCase.execute({
      publicId,
      body: request.body,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDefaultPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
