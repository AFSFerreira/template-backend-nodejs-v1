import z from 'zod'

export type DashboardMetricsDefaultPresenterInput = Record<string, unknown>

export const httpDashboardMetricsDefaultSchema = z.object({})

export type HTTPDashboardMetricsDefault = z.infer<typeof httpDashboardMetricsDefaultSchema>
