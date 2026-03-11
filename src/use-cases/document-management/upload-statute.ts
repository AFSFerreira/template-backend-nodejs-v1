import type {
  UploadDocumentUseCaseRequest,
  UploadDocumentUseCaseResponse,
} from '@custom-types/use-cases/document-management/upload-document'
import { STATUTE_FILE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/pino'
import { STATUTE_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/document-management-loggings'
import { FileService } from '@services/files/file-service'
import { FileTooBigError } from '@use-cases/errors/generic/file-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { getFileExtension } from '@utils/files/get-file-extension'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UploadStatuteUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

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

    const filename = `${STATUTE_FILE_NAME}.${getFileExtension(originalFilename)}`

    const persistImageIsSuccessful = await this.fileService.swapFiles([
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

    logger.info({ filename }, STATUTE_UPLOADED_SUCCESSFULLY)

    return {}
  }
}
