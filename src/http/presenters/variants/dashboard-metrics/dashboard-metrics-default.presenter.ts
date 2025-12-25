import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDashboardMetricsDefault } from '@custom-types/presenter/dashboard-metrics/dashboard-metrics-default'
import { DASHBOARD_METRICS_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(DASHBOARD_METRICS_DEFAULT_PRESENTER_KEY)
export class DashboardMetricsDefaultPresenter implements IPresenterStrategy<
  Record<string, unknown>,
  HTTPDashboardMetricsDefault
> {
  public toHTTP(): HTTPDashboardMetricsDefault {
    return {}
  }
}
