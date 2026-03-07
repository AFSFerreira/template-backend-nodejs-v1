import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface DashboardNewslettersMetricsPresenterInput {
  totalNewsletters: number
}

const dashboardNewslettersMetricsSchema = z.object({
  totalNewsletters: numberSchema,
})

export type HTTPDashboardNewslettersMetrics = z.infer<typeof dashboardNewslettersMetricsSchema>
