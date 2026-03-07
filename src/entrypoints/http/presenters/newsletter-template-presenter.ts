import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { container } from 'tsyringe'

export class NewsletterTemplatePresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(
    input: TInput | TInput[],
    contextKey: string = tsyringeTokens.presenters.newsletterTemplate.newsletterTemplateDefault,
  ): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => NewsletterTemplatePresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = container.resolve<IPresenterStrategy<TInput, TOutput>>(contextKey)

    return strategy.toHTTP(input)
  }
}
