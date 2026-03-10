import type { IController } from '@custom-types/utils/http/adapt-route'
import type { GetBlogsMetricsUseCase } from '@use-cases/dashboard-metrics/get-blogs-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardBlogsMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-blogs-metrics.presenter'
import { injectable } from 'tsyringe'

@injectable()
export class GetBlogsMetricsController implements IController {
  constructor(private useCase: GetBlogsMetricsUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const metrics = await this.useCase.execute()

    const formattedReply = DashboardBlogsMetricsPresenter.toHTTP(metrics)

    return await reply.sendResponse(formattedReply)
  }
}
