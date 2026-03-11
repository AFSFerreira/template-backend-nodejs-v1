import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardBlogsMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-blogs-metrics.presenter'
import { GetBlogsMetricsUseCase } from '@use-cases/dashboard-metrics/get-blogs-metrics'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetBlogsMetricsController implements IController {
  constructor(
    @inject(GetBlogsMetricsUseCase)
    private readonly useCase: GetBlogsMetricsUseCase,

    @inject(DashboardBlogsMetricsPresenter)
    private readonly dashboardBlogsMetricsPresenter: DashboardBlogsMetricsPresenter,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = this.dashboardBlogsMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
