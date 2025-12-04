import { UploadStatuteUseCase } from '@use-cases/document-management/upload-statute'

export function makeUploadStatuteUseCase() {
  const uploadDocumentUseCase = new UploadStatuteUseCase()

  return uploadDocumentUseCase
}
