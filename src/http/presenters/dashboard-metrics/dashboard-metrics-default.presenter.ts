import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardMetricsDefaultPresenterInput,
  HTTPDashboardMetricsDefault,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-metrics-default'

export class DashboardMetricsDefaultPresenter
  implements IPresenterStrategy<DashboardMetricsDefaultPresenterInput, HTTPDashboardMetricsDefault>
{
  public toHTTP(): HTTPDashboardMetricsDefault {
    return {}
  }
}
