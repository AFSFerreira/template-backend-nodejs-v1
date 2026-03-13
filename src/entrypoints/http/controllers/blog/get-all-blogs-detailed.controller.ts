import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllBlogsDetailedQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-detailed-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { BlogDetailedForAdminPresenter } from '@http/presenters/blog/blog-detailed-for-admin.presenter'
import { GetAllBlogsDetailedUseCase } from '@use-cases/blog/get-all-blogs-detailed'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllBlogsDetailedController implements IController {
  constructor(
    @inject(GetAllBlogsDetailedUseCase)
    private readonly useCase: GetAllBlogsDetailedUseCase,

    @inject(BlogDetailedForAdminPresenter)
    private readonly blogDetailedForAdminPresenter: BlogDetailedForAdminPresenter,
  ) {}

  async handle(
    request: ZodRequest<{
      querystring: GetAllBlogsDetailedQueryType
    }>,
    reply: FastifyReply,
  ) {
    const { data, meta } = await this.useCase.execute({
      ...request.query,
      userPublicId: getRequestUserPublicId(request),
    })

    const formattedReply = this.blogDetailedForAdminPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
