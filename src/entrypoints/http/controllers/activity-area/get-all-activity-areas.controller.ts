import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllActivityAreasType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'
import type { FastifyReply } from 'fastify'
import { ActivityAreaDefaultPresenter } from '@http/presenters/activity-area/activity-area-default.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasController implements IController {
  constructor(private useCase: GetAllActivityAreasUseCase) {}

  async handle(request: ZodRequest<{ querystring: GetAllActivityAreasType }>, reply: FastifyReply) {
    const parsedQuery = request.query
    const { data, meta } = await this.useCase.execute(parsedQuery)

    const formattedReply = ActivityAreaDefaultPresenter.toHTTPList(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
