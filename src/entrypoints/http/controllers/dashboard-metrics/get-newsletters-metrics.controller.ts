import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardNewslettersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-newsletters-metrics.presenter'
import { GetNewslettersMetricsUseCase } from '@use-cases/dashboard-metrics/get-newsletters-metrics'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetNewslettersMetricsController implements IController {
  constructor(
    @inject(GetNewslettersMetricsUseCase)
    private readonly useCase: GetNewslettersMetricsUseCase,

    @inject(DashboardNewslettersMetricsPresenter)
    private readonly dashboardNewslettersMetricsPresenter: DashboardNewslettersMetricsPresenter,
  ) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = this.dashboardNewslettersMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
