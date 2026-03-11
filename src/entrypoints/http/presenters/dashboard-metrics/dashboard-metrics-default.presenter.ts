import type { HTTPDashboardMetricsDefault } from '@custom-types/http/presenter/dashboard-metrics/dashboard-metrics-default'
import { singleton } from 'tsyringe'

@singleton()
export class DashboardMetricsDefaultPresenter {
  public toHTTP(): HTTPDashboardMetricsDefault {
    return {}
  }
}
