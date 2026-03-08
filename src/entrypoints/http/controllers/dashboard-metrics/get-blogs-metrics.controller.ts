import type {
  DashboardBlogsMetricsPresenterInput,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-blogs-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardPresenter } from '@http/presenters/dashboard-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetBlogsMetricsUseCase } from '@use-cases/dashboard-metrics/get-blogs-metrics'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function getBlogsMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetBlogsMetricsUseCase)

  const metrics = await useCase.execute()

  return await reply.status(StatusCodes.OK).send({
    data: DashboardPresenter.toHTTP<DashboardBlogsMetricsPresenterInput, HTTPDashboardBlogsMetrics>(
      metrics,
      tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsBlogs,
    ),
  })
}
