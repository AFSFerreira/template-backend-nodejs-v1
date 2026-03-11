import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardBlogsMetricsPresenterInput,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-blogs-metrics'
import { singleton } from 'tsyringe'

@singleton()
export class DashboardBlogsMetricsPresenter
  implements IPresenterStrategy<DashboardBlogsMetricsPresenterInput, HTTPDashboardBlogsMetrics>
{
  public toHTTP(input: DashboardBlogsMetricsPresenterInput): HTTPDashboardBlogsMetrics {
    return {
      totalBlogs: input.totalBlogs,
    }
  }

  toHTTPList(inputs: DashboardBlogsMetricsPresenterInput[]): HTTPDashboardBlogsMetrics[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
