import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllActivityAreasWithBlogsQueryType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { ActivityAreaWithBlogsCountPresenter } from '@http/presenters/activity-area/activity-area-with-blogs-count.presenter'
import { GetAllActivityAreasWithBlogsUseCase } from '@use-cases/activity-area/get-all-activity-areas-with-blogs-use-case'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasWithBlogsController implements IController {
  constructor(
    @inject(GetAllActivityAreasWithBlogsUseCase)
    private readonly useCase: GetAllActivityAreasWithBlogsUseCase,

    @inject(ActivityAreaWithBlogsCountPresenter)
    private readonly activityAreaWithBlogsCountPresenter: ActivityAreaWithBlogsCountPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllActivityAreasWithBlogsQueryType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = this.activityAreaWithBlogsCountPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
