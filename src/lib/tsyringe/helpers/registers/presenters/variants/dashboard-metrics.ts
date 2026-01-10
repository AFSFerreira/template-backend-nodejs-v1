import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DashboardBlogsMetricsPresenter } from '@presenters/variants/dashboard-metrics/dashboard-blogs-metrics.presenter'
import { DashboardMetricsDefaultPresenter } from '@presenters/variants/dashboard-metrics/dashboard-metrics-default.presenter'
import { DashboardNewslettersMetricsPresenter } from '@presenters/variants/dashboard-metrics/dashboard-newsletters-metrics.presenter'
import { UsersMetricsPresenter } from '@presenters/variants/dashboard-metrics/dashboard-users-metrics.presenter'

export function registerDashboardMetricsPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.dashboardMetrics.dashboardMetricsDefault,
    container,
    target: DashboardMetricsDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.dashboardMetrics.dashboardMetricsBlogs,
    container,
    target: DashboardBlogsMetricsPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.dashboardMetrics.dashboardMetricsUsers,
    container,
    target: UsersMetricsPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.dashboardMetrics.dashboardMetricsNewsletters,
    container,
    target: DashboardNewslettersMetricsPresenter,
  })
}
