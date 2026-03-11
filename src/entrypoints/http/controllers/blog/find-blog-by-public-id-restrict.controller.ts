import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { FindBlogByPublicIdParamsType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDetailedWithContentPresenter } from '@http/presenters/blog/blog-detailed-with-content.presenter'
import { FindBlogByPublicIdRestrictedUseCase } from '@use-cases/blog/find-blog-by-public-id-detailed'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindBlogByPublicIdRestrictedController implements IController {
  constructor(
    @inject(FindBlogByPublicIdRestrictedUseCase)
    private readonly useCase: FindBlogByPublicIdRestrictedUseCase,

    @inject(BlogDetailedWithContentPresenter)
    private readonly blogDetailedWithContentPresenter: BlogDetailedWithContentPresenter,
  ) {}

  async handle(request: ZodRequest<{ params: FindBlogByPublicIdParamsType }>, reply: FastifyReply) {
    const { publicId } = request.params
    const { blog } = await this.useCase.execute({ publicId, userPublicId: getRequestUserPublicId(request) })

    const formattedReply = this.blogDetailedWithContentPresenter.toHTTP(blog)

    return await reply.sendResponse(formattedReply)
  }
}
