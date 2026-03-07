import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface DashboardUsersMetricsPresenterInput {
  totalActiveUsers: number
  totalPendingUsers: number
  totalInactiveUsers: number
  totalUsers: number
}

const dashboardUsersMetricsSchema = z.object({
  totalActiveUsers: numberSchema,
  totalPendingUsers: numberSchema,
  totalInactiveUsers: numberSchema,
  totalUsers: numberSchema,
})

export type HTTPDashboardUsersMetrics = z.infer<typeof dashboardUsersMetricsSchema>
