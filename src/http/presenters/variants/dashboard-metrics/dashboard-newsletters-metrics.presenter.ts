import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardNewslettersMetrics,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-newsletters-metrics'
import { DASHBOARD_METRICS_NEWSLETTERS_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(DASHBOARD_METRICS_NEWSLETTERS_PRESENTER_KEY)
export class DashboardNewslettersMetricsPresenter implements IPresenterStrategy<
  DashboardNewslettersMetrics,
  HTTPDashboardNewslettersMetrics
> {
  public toHTTP(input: DashboardNewslettersMetrics): HTTPDashboardNewslettersMetrics {
    return {
      ...input,
    }
  }
}
