import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardNewslettersMetricsPresenterInput,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-newsletters-metrics'

export class DashboardNewslettersMetricsPresenter
  implements IPresenterStrategy<DashboardNewslettersMetricsPresenterInput, HTTPDashboardNewslettersMetrics>
{
  public toHTTP(input: DashboardNewslettersMetricsPresenterInput): HTTPDashboardNewslettersMetrics {
    return {
      totalNewsletters: input.totalNewsletters,
    }
  }
}
