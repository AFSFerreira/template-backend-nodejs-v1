import { UploadElectionNoticeUseCase } from '@use-cases/document-management/upload-election-notice'

export function makeUploadElectionNoticeUseCase() {
  const uploadElectionNoticeUseCase = new UploadElectionNoticeUseCase()

  return uploadElectionNoticeUseCase
}
