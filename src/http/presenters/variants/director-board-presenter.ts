import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { container } from 'tsyringe'

export class DirectorBoardPresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(
    input: TInput | TInput[],
    contextKey: string = tokens.presenters.directorBoard.directorBoardDefault,
  ): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => DirectorBoardPresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = container.resolve<IPresenterStrategy<TInput, TOutput>>(contextKey)

    return strategy.toHTTP(input)
  }
}
