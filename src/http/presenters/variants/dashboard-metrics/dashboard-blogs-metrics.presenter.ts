import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardBlogsMetrics,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-blogs-metrics'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.dashboardMetricsBlogs)
export class DashboardBlogsMetricsPresenter
  implements IPresenterStrategy<DashboardBlogsMetrics, HTTPDashboardBlogsMetrics>
{
  public toHTTP(input: DashboardBlogsMetrics): HTTPDashboardBlogsMetrics {
    return {
      ...input,
    }
  }
}
