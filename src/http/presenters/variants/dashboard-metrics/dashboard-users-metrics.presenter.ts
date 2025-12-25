import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardUsersMetrics,
  HTTPDashboardUsersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-users-metrics'
import { DASHBOARD_METRICS_USERS_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(DASHBOARD_METRICS_USERS_PRESENTER_KEY)
export class UsersMetricsPresenter implements IPresenterStrategy<DashboardUsersMetrics, HTTPDashboardUsersMetrics> {
  public toHTTP(input: DashboardUsersMetrics): HTTPDashboardUsersMetrics {
    return {
      ...input,
    }
  }
}
