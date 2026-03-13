import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardNewslettersMetricsPresenterInput,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-newsletters-metrics'
import { singleton } from 'tsyringe'

@singleton()
export class DashboardNewslettersMetricsPresenter
  implements IPresenterStrategy<DashboardNewslettersMetricsPresenterInput, HTTPDashboardNewslettersMetrics>
{
  public toHTTP(input: DashboardNewslettersMetricsPresenterInput): HTTPDashboardNewslettersMetrics
  public toHTTP(input: DashboardNewslettersMetricsPresenterInput[]): HTTPDashboardNewslettersMetrics[]
  public toHTTP(
    input: DashboardNewslettersMetricsPresenterInput | DashboardNewslettersMetricsPresenterInput[],
  ): HTTPDashboardNewslettersMetrics | HTTPDashboardNewslettersMetrics[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      totalNewsletters: input.totalNewsletters,
    }
  }
}
