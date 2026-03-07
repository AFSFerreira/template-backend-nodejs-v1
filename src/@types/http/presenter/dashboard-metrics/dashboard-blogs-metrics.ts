import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface DashboardBlogsMetricsPresenterInput {
  totalBlogs: number
}

export const dashboardBlogsMetricsSchema = z.object({
  totalBlogs: numberSchema,
})

export type HTTPDashboardBlogsMetrics = z.infer<typeof dashboardBlogsMetricsSchema>
