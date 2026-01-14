import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { DependencyContainer } from 'tsyringe'

export interface IRegisterPresenter {
  contextKey: string
  container: DependencyContainer
  target: new () => IPresenterStrategy<unknown, unknown>
}
