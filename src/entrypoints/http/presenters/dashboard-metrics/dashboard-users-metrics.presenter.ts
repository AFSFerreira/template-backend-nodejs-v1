import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DashboardUsersMetricsPresenterInput,
  HTTPDashboardUsersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-users-metrics'
import { singleton } from 'tsyringe'

@singleton()
export class UsersMetricsPresenter
  implements IPresenterStrategy<DashboardUsersMetricsPresenterInput, HTTPDashboardUsersMetrics>
{
  public toHTTP(input: DashboardUsersMetricsPresenterInput): HTTPDashboardUsersMetrics {
    return {
      totalActiveUsers: input.totalActiveUsers,
      totalInactiveUsers: input.totalInactiveUsers,
      totalPendingUsers: input.totalPendingUsers,
      totalUsers: input.totalUsers,
    }
  }

  toHTTPList(inputs: DashboardUsersMetricsPresenterInput[]): HTTPDashboardUsersMetrics[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
