import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetUsersMetricsUseCase } from '@use-cases/dashboard-metrics/get-users-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UsersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-users-metrics.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetUsersMetricsController implements IController {
  constructor(private useCase: GetUsersMetricsUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = UsersMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
