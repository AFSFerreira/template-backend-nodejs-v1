import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDashboardMetricsDefault } from '@custom-types/presenter/dashboard-metrics/dashboard-metrics-default'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.dashboardMetricsDefault)
export class DashboardMetricsDefaultPresenter
  implements IPresenterStrategy<Record<string, unknown>, HTTPDashboardMetricsDefault>
{
  public toHTTP(): HTTPDashboardMetricsDefault {
    return {}
  }
}
