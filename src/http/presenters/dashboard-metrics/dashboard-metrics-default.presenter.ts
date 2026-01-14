import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDashboardMetricsDefault } from '@custom-types/http/presenter/dashboard-metrics/dashboard-metrics-default'

export class DashboardMetricsDefaultPresenter
  implements IPresenterStrategy<Record<string, unknown>, HTTPDashboardMetricsDefault>
{
  public toHTTP(): HTTPDashboardMetricsDefault {
    return {}
  }
}
