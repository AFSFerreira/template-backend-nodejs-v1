import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetNewslettersMetricsUseCase } from '@use-cases/dashboard-metrics/get-newsletters-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardNewslettersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-newsletters-metrics.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetNewslettersMetricsController implements IController {
  constructor(private useCase: GetNewslettersMetricsUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = DashboardNewslettersMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
