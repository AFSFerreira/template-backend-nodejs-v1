import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { GetAllActivityAreasType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-schema'
import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply } from 'fastify'
import { ActivityAreaDefaultPresenter } from '@http/presenters/activity-area/activity-area-default.presenter'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllActivityAreasController implements IController {
  constructor(
    @inject(GetAllActivityAreasUseCase)
    private readonly useCase: GetAllActivityAreasUseCase,

    @inject(ActivityAreaDefaultPresenter)
    private readonly activityAreaDefaultPresenter: ActivityAreaDefaultPresenter,
  ) {}

  async handle(request: ZodRequest<{ querystring: GetAllActivityAreasType }>, reply: FastifyReply) {
    const { data, meta } = await this.useCase.execute(request.query)

    const formattedReply = this.activityAreaDefaultPresenter.toHTTP(data)

    return await reply.sendPaginated(formattedReply, meta)
  }
}
