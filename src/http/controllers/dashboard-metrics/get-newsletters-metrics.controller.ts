import type { DashboardNewslettersMetricsPresenter } from '@presenters/dashboard-metrics/dashboard-newsletters-metrics.presenter'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { GetNewslettersMetricsUseCase } from '@use-cases/dashboard-metrics/get-newsletters-metrics'
import { container } from 'tsyringe'

export async function getNewslettersMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetNewslettersMetricsUseCase)
  const presenter = container.resolve<DashboardNewslettersMetricsPresenter>(
    tokens.presenters.dashboardMetrics.dashboardMetricsNewsletters,
  )

  const metrics = await useCase.execute()

  return await reply.status(200).send({
    data: presenter.toHTTP(metrics),
  })
}
