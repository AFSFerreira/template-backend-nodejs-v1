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
  public toHTTP(input: DashboardUsersMetricsPresenterInput): HTTPDashboardUsersMetrics
  public toHTTP(input: DashboardUsersMetricsPresenterInput[]): HTTPDashboardUsersMetrics[]
  public toHTTP(
    input: DashboardUsersMetricsPresenterInput | DashboardUsersMetricsPresenterInput[],
  ): HTTPDashboardUsersMetrics | HTTPDashboardUsersMetrics[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      totalActiveUsers: input.totalActiveUsers,
      totalInactiveUsers: input.totalInactiveUsers,
      totalPendingUsers: input.totalPendingUsers,
      totalUsers: input.totalUsers,
    }
  }
}
