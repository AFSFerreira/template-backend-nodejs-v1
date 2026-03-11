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
  public toHTTP(input: DashboardNewslettersMetricsPresenterInput): HTTPDashboardNewslettersMetrics {
    return {
      totalNewsletters: input.totalNewsletters,
    }
  }

  toHTTPList(inputs: DashboardNewslettersMetricsPresenterInput[]): HTTPDashboardNewslettersMetrics[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
