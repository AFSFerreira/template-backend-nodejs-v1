import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardNewslettersMetrics,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-newsletters-metrics'

export class DashboardNewslettersMetricsPresenter
  implements IPresenterStrategy<DashboardNewslettersMetrics, HTTPDashboardNewslettersMetrics>
{
  public toHTTP(input: DashboardNewslettersMetrics): HTTPDashboardNewslettersMetrics {
    return {
      ...input,
    }
  }
}
