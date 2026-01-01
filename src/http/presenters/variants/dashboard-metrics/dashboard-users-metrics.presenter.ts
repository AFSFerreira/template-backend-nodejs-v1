import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardUsersMetrics,
  HTTPDashboardUsersMetrics,
} from '@custom-types/presenter/dashboard-metrics/dashboard-users-metrics'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.dashboardMetricsUsers)
export class UsersMetricsPresenter implements IPresenterStrategy<DashboardUsersMetrics, HTTPDashboardUsersMetrics> {
  public toHTTP(input: DashboardUsersMetrics): HTTPDashboardUsersMetrics {
    return {
      ...input,
    }
  }
}
