import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllBlogsDetailedQueryType } from '@custom-types/http/schemas/blog/get-all-blogs-detailed-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllBlogsDetailedUseCase } from '@use-cases/blog/get-all-blogs-detailed'
import type { FastifyReply } from 'fastify'
import { BlogDetailedForAdminPresenter } from '@http/presenters/blog/blog-detailed-for-admin.presenter'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllBlogsDetailedController implements IController {
  constructor(private useCase: GetAllBlogsDetailedUseCase) {}

  async handle(
    request: ZodRequest<{
      querystring: GetAllBlogsDetailedQueryType
    }>,
    reply: FastifyReply,
  ) {
    const userPublicId = getRequestUserPublicId(request)
    const query = request.query
    const { data, meta } = await this.useCase.execute({
      ...query,
      userPublicId,
    })

    const formattedReply = BlogDetailedForAdminPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
