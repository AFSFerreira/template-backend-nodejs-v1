import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardBlogsMetricsPresenterInput,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-blogs-metrics'

export class DashboardBlogsMetricsPresenter
  implements IPresenterStrategy<DashboardBlogsMetricsPresenterInput, HTTPDashboardBlogsMetrics>
{
  public toHTTP(input: DashboardBlogsMetricsPresenterInput): HTTPDashboardBlogsMetrics {
    return {
      totalBlogs: input.totalBlogs,
    }
  }
}
