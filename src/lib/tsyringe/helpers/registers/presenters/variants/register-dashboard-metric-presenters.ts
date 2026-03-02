import type { DependencyContainer } from 'tsyringe'
import { DashboardBlogsMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-blogs-metrics.presenter'
import { DashboardMetricsDefaultPresenter } from '@http/presenters/dashboard-metrics/dashboard-metrics-default.presenter'
import { DashboardNewslettersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-newsletters-metrics.presenter'
import { UsersMetricsPresenter } from '@http/presenters/dashboard-metrics/dashboard-users-metrics.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerDashboardMetricsPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsDefault,
    container,
    target: DashboardMetricsDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsBlogs,
    container,
    target: DashboardBlogsMetricsPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsUsers,
    container,
    target: UsersMetricsPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.dashboardMetrics.dashboardMetricsNewsletters,
    container,
    target: DashboardNewslettersMetricsPresenter,
  })
}
