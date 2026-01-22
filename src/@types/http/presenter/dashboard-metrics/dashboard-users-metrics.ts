export interface DashboardUsersMetrics {
  totalActiveUsers: number
  totalPendingUsers: number
  totalInactiveUsers: number
  totalUsers: number
}

export interface HTTPDashboardUsersMetrics {
  totalActiveUsers: number
  totalPendingUsers: number
  totalInactiveUsers: number
  totalUsers: number
}

export interface DashboardUsersMetricsPresenterInput extends DashboardUsersMetrics {}
