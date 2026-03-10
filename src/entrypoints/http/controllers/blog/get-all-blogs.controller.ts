import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllBlogsQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllBlogsUseCase } from '@use-cases/blog/get-all-blogs'
import type { FastifyReply } from 'fastify'
import { BlogSimplifiedPresenter } from '@http/presenters/blog/blog-simplified.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllBlogsController implements IController {
  constructor(private useCase: GetAllBlogsUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllBlogsQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = BlogSimplifiedPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
