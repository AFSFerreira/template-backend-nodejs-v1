import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UsersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-users-metrics.presenter'
import { GetUsersMetricsUseCase } from '@use-cases/dashboard-metrics/get-users-metrics'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUsersMetricsController implements IController {
  constructor(
    @inject(GetUsersMetricsUseCase)
    private readonly useCase: GetUsersMetricsUseCase,

    @inject(UsersMetricsPresenter)
    private readonly usersMetricsPresenter: UsersMetricsPresenter,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = this.usersMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
