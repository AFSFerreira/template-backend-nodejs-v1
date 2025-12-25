import type {
  DashboardUsersMetrics,
  HTTPDashboardUsersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-users-metrics'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DASHBOARD_METRICS_USERS_PRESENTER_KEY } from '@constants/presenters-constants'
import { DashboardPresenter } from '@presenters/variants/dashboard-presenter'
import { GetUsersMetricsUseCase } from '@use-cases/dashboard-metrics/get-users-metrics'
import { container } from 'tsyringe'

export async function getUsersMetrics(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetUsersMetricsUseCase)

  const metrics = await useCase.execute()

  return await reply.status(200).send({
    data: DashboardPresenter.toHTTP<DashboardUsersMetrics, HTTPDashboardUsersMetrics>(
      metrics,
      DASHBOARD_METRICS_USERS_PRESENTER_KEY,
    ),
  })
}
