import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardBlogsMetrics,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-blogs-metrics'
import { DASHBOARD_METRICS_BLOGS_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(DASHBOARD_METRICS_BLOGS_PRESENTER_KEY)
export class DashboardBlogsMetricsPresenter implements IPresenterStrategy<
  DashboardBlogsMetrics,
  HTTPDashboardBlogsMetrics
> {
  public toHTTP(input: DashboardBlogsMetrics): HTTPDashboardBlogsMetrics {
    return {
      ...input,
    }
  }
}
