import type {
  DashboardUsersMetricsPresenterInput,
  HTTPDashboardUsersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-users-metrics'

export const UsersMetricsPresenter = {
  toHTTP(input: DashboardUsersMetricsPresenterInput): HTTPDashboardUsersMetrics {
    return {
      totalActiveUsers: input.totalActiveUsers,
      totalInactiveUsers: input.totalInactiveUsers,
      totalPendingUsers: input.totalPendingUsers,
      totalUsers: input.totalUsers,
    }
  },

  toHTTPList(inputs: DashboardUsersMetricsPresenterInput[]): HTTPDashboardUsersMetrics[] {
    return inputs.map(this.toHTTP)
  },
}
