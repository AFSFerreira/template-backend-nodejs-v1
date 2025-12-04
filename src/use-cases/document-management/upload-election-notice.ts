import path from 'node:path'

import { ELECTION_NOTICE_FILE_NAME } from '@constants/file-constants'
import type {
  UploadDocumentUseCaseRequest,
  UploadDocumentUseCaseResponse,
} from '@custom-types/use-cases/document-management/upload-document'
import { swapMultipartFiles } from '@services/swap-multipart-files'
import { FileTooBigError } from '@use-cases/errors/document-management/file-too-big-error'

export class UploadElectionNoticeUseCase {
  async execute({
    filePart,
    baseFolder,
    originalFilename,
  }: UploadDocumentUseCaseRequest): Promise<UploadDocumentUseCaseResponse> {
    const filename = `${ELECTION_NOTICE_FILE_NAME}${path.extname(originalFilename)}`

    const persistImageIsSuccessful = await swapMultipartFiles([
      {
        filename,
        baseFolder,
        filePart,
        anyExtension: true,
      },
    ])

    if (!persistImageIsSuccessful) {
      throw new FileTooBigError()
    }

    return {}
  }
}
