import { GetStatuteUseCase } from '@use-cases/document-management/get-statute'

export function makeGetStatuteUseCase() {
  const getStatuteUseCase = new GetStatuteUseCase()

  return getStatuteUseCase
}
