import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllBlogsQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogSimplifiedPresenter } from '@http/presenters/blog/blog-simplified.presenter'
import { GetAllBlogsUseCase } from '@use-cases/blog/get-all-blogs'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllBlogsController implements IController {
  constructor(
    @inject(GetAllBlogsUseCase)
    private readonly useCase: GetAllBlogsUseCase,

    @inject(BlogSimplifiedPresenter)
    private readonly blogSimplifiedPresenter: BlogSimplifiedPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllBlogsQueryType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.blogSimplifiedPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
