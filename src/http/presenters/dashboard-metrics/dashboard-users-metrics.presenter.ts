import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardUsersMetrics,
  HTTPDashboardUsersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-users-metrics'

export class UsersMetricsPresenter implements IPresenterStrategy<DashboardUsersMetrics, HTTPDashboardUsersMetrics> {
  public toHTTP(input: DashboardUsersMetrics): HTTPDashboardUsersMetrics {
    return {
      ...input,
    }
  }
}
