import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllUserBlogsDetailedQueryType } from '@custom-types/http/schemas/blog/get-all-user-blogs-detailed-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllUserBlogsDetailedUseCase } from '@use-cases/blog/get-all-user-blogs-detailed'
import type { FastifyReply } from 'fastify'
import { BlogDetailedForAdminPresenter } from '@http/presenters/blog/blog-detailed-for-admin.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllUserBlogsDetailedController implements IController {
  constructor(private useCase: GetAllUserBlogsDetailedUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllUserBlogsDetailedQueryType }>, reply: FastifyReply) {
    const userPublicId = getRequestUserPublicId(request)
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute({
      ...parsedQuery,
      userPublicId,
    })

    const formattedReply = BlogDetailedForAdminPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
