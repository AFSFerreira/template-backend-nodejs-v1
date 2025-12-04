import { GetElectionNoticeUseCase } from '@use-cases/document-management/get-election-notice'

export function makeGetElectionNoticeUseCase() {
  const getElectionNoticeUseCase = new GetElectionNoticeUseCase()

  return getElectionNoticeUseCase
}
