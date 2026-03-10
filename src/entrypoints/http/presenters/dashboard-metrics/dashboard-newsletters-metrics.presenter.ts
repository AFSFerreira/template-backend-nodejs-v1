import type {
  DashboardNewslettersMetricsPresenterInput,
  HTTPDashboardNewslettersMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-newsletters-metrics'

export const DashboardNewslettersMetricsPresenter = {
  toHTTP(input: DashboardNewslettersMetricsPresenterInput): HTTPDashboardNewslettersMetrics {
    return {
      totalNewsletters: input.totalNewsletters,
    }
  },

  toHTTPList(inputs: DashboardNewslettersMetricsPresenterInput[]): HTTPDashboardNewslettersMetrics[] {
    return inputs.map(this.toHTTP)
  },
}
