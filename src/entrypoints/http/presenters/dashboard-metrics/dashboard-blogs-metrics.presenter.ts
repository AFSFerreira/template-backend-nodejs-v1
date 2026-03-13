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
  public toHTTP(input: DashboardBlogsMetricsPresenterInput): HTTPDashboardBlogsMetrics
  public toHTTP(input: DashboardBlogsMetricsPresenterInput[]): HTTPDashboardBlogsMetrics[]
  public toHTTP(
    input: DashboardBlogsMetricsPresenterInput | DashboardBlogsMetricsPresenterInput[],
  ): HTTPDashboardBlogsMetrics | HTTPDashboardBlogsMetrics[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      totalBlogs: input.totalBlogs,
    }
  }
}
