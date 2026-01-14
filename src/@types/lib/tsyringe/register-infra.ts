import type { DependencyContainer } from 'tsyringe'

export interface IRegisterInfra {
  contextKey: string
  container: DependencyContainer
  target: new () => unknown
}
