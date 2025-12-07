import path from 'node:path'
import { STATUTE_FILE_NAME } from '@constants/file-constants'
import type {
  UploadDocumentUseCaseRequest,
  UploadDocumentUseCaseResponse,
} from '@custom-types/use-cases/document-management/upload-document'
import { swapMultipartFiles } from '@services/swap-multipart-files'
import { FileTooBigError } from '@use-cases/errors/document-management/file-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/document-management/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadStatuteUseCase {
  async execute({
    filePart,
    baseFolder,
    originalFilename,
  }: UploadDocumentUseCaseRequest): Promise<UploadDocumentUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    const filename = `${STATUTE_FILE_NAME}${path.extname(originalFilename)}`

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
