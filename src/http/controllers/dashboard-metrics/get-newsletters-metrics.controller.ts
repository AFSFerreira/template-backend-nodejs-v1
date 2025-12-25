import type {
  DashboardNewslettersMetrics,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-newsletters-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DASHBOARD_METRICS_NEWSLETTERS_PRESENTER_KEY } from '@constants/presenters-constants'
import { DashboardPresenter } from '@presenters/variants/dashboard-presenter'
import { GetNewslettersMetricsUseCase } from '@use-cases/dashboard-metrics/get-newsletters-metrics'
import { container } from 'tsyringe'

export async function getNewslettersMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetNewslettersMetricsUseCase)

  const metrics = await useCase.execute()

  return await reply.status(200).send({
    data: DashboardPresenter.toHTTP<DashboardNewslettersMetrics, HTTPDashboardNewslettersMetrics>(
      metrics,
      DASHBOARD_METRICS_NEWSLETTERS_PRESENTER_KEY,
    ),
  })
}
