import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { container } from 'tsyringe'

export class DirectorPositionPresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(
    input: TInput | TInput[],
    contextKey: string = tokens.presenters.directorPosition.directorPositionDefault,
  ): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => DirectorPositionPresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = container.resolve<IPresenterStrategy<TInput, TOutput>>(contextKey)

    return strategy.toHTTP(input)
  }
}
