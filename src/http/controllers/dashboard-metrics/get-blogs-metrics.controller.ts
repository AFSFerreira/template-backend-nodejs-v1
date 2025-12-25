import type {
  DashboardBlogsMetrics,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-blogs-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DASHBOARD_METRICS_BLOGS_PRESENTER_KEY } from '@constants/presenters-constants'
import { DashboardPresenter } from '@presenters/variants/dashboard-presenter'
import { GetBlogsMetricsUseCase } from '@use-cases/dashboard-metrics/get-blogs-metrics'
import { container } from 'tsyringe'

export async function getBlogsMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetBlogsMetricsUseCase)

  const metrics = await useCase.execute()

  return await reply.status(200).send({
    data: DashboardPresenter.toHTTP<DashboardBlogsMetrics, HTTPDashboardBlogsMetrics>(
      metrics,
      DASHBOARD_METRICS_BLOGS_PRESENTER_KEY,
    ),
  })
}
