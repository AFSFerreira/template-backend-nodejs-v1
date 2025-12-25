import { DASHBOARD_METRICS_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { presenterRegistry } from '../presenter-registry'

export class DashboardPresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(input: TInput | TInput[], contextKey?: string): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => DashboardPresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = presenterRegistry.get(contextKey ?? DASHBOARD_METRICS_DEFAULT_PRESENTER_KEY)

    const result = strategy.toHTTP(input)

    return result as TOutput
  }
}
