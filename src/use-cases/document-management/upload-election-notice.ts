import type {
  UploadDocumentUseCaseRequest,
  UploadDocumentUseCaseResponse,
} from '@custom-types/use-cases/document-management/upload-document'
import { ELECTION_NOTICE_FILE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/pino'
import { ELECTION_NOTICE_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/document-management-loggings'
import { swapFiles } from '@services/files/swap-files'
import { FileTooBigError } from '@use-cases/errors/generic/file-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { getFileExtension } from '@utils/files/get-file-extension'
import { injectable } from 'tsyringe'

@injectable()
export class UploadElectionNoticeUseCase {
  async execute({
    filePart,
    baseFolder,
    originalFilename,
  }: UploadDocumentUseCaseRequest): Promise<UploadDocumentUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new FileTooBigError()
    }

    const filename = `${ELECTION_NOTICE_FILE_NAME}.${getFileExtension(originalFilename)}`

    const persistImageIsSuccessful = await swapFiles([
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

    logger.info({ filename }, ELECTION_NOTICE_UPLOADED_SUCCESSFULLY)

    return {}
  }
}
