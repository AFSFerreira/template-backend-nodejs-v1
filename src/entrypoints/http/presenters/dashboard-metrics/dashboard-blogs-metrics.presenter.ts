import type {
  DashboardBlogsMetricsPresenterInput,
  HTTPDashboardBlogsMetrics,
} from '@custom-types/http/presenter/dashboard-metrics/dashboard-blogs-metrics'

export const DashboardBlogsMetricsPresenter = {
  toHTTP(input: DashboardBlogsMetricsPresenterInput): HTTPDashboardBlogsMetrics {
    return {
      totalBlogs: input.totalBlogs,
    }
  },

  toHTTPList(inputs: DashboardBlogsMetricsPresenterInput[]): HTTPDashboardBlogsMetrics[] {
    return inputs.map(this.toHTTP)
  },
}
