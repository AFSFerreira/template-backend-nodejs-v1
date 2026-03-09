import type {
  DashboardUsersMetricsPresenterInput,
  HTTPDashboardUsersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-users-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DashboardPresenter } from '@http/presenters/dashboard-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GetUsersMetricsUseCase } from '@use-cases/dashboard-metrics/get-users-metrics'
import { container } from 'tsyringe'

export async function getUsersMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetUsersMetricsUseCase)

  const metrics = await useCase.execute()

  const formattedReply = DashboardPresenter.toHTTP<DashboardUsersMetricsPresenterInput, HTTPDashboardUsersMetrics>(
    metrics,
    tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsUsers,
  )

  return await reply.sendResponse(formattedReply)
}
