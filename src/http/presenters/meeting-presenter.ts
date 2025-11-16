import { MEETING_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { presenterRegistry } from './presenter-registry'

export class MeetingPresenter {
  static toHTTP<TInput, TOutput>(input: TInput, contextKey?: string): TOutput

  static toHTTP<TInput, TOutput>(input: TInput[], contextKey?: string): TOutput[]

  static toHTTP<TInput, TOutput>(input: TInput | TInput[], contextKey?: string): TOutput | TOutput[] {
    if (Array.isArray(input)) {
      return input.map((item) => MeetingPresenter.toHTTP<TInput, TOutput>(item, contextKey))
    }

    const strategy = presenterRegistry.get(contextKey ?? MEETING_DEFAULT_PRESENTER_KEY)

    const result = strategy.toHTTP(input)

    return result as TOutput
  }
}
