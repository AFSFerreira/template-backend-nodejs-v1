import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllActivityAreasWithBlogsQueryType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllActivityAreasWithBlogsUseCase } from '@use-cases/activity-area/get-all-activity-areas-with-blogs-use-case'
import type { FastifyReply } from 'fastify'
import { ActivityAreaWithBlogsCountPresenter } from '@http/presenters/activity-area/activity-area-with-blogs-count.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasWithBlogsController implements IController {
  constructor(private useCase: GetAllActivityAreasWithBlogsUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllActivityAreasWithBlogsQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = ActivityAreaWithBlogsCountPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
