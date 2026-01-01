import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { USER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { container } from 'tsyringe'

export class UserPresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(
    input: TInput | TInput[],
    contextKey: string = USER_DEFAULT_PRESENTER_KEY,
  ): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => UserPresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = container.resolve<IPresenterStrategy<TInput, TOutput>>(contextKey)

    return strategy.toHTTP(input)
  }
}
