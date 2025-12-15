import type {
  UploadNewsletterHtmlUseCaseRequest,
  UploadNewsletterHtmlUseCaseResponse,
} from '@custom-types/use-cases/newsletters/upload-newsletter-html'
import { NEWSLETTER_TEMP_HTML_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/logger'
import { NEWSLETTER_HTML_UPLOADED_SUCCESSFULLY } from '@messages/loggings/newsletter-loggings'
import { saveFile } from '@services/files/save-file'
import { MissingMultipartContentFile } from '@use-cases/errors/document-management/missing-multipart-content-file'
import { FileTooBigError } from '@use-cases/errors/newsletter/file-too-big-error'
import { injectable } from 'tsyringe'

@injectable()
export class UploadNewsletterHtmlUseCase {
  async execute({
    originalFilename,
    filePart,
  }: UploadNewsletterHtmlUseCaseRequest): Promise<UploadNewsletterHtmlUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new FileTooBigError()
    }

    const { fileName, success } = await saveFile({
      originalFilename,
      fileStream: filePart.file,
      folderPath: NEWSLETTER_TEMP_HTML_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new FileTooBigError()
    }

    logger.info(
      {
        fileName,
      },
      NEWSLETTER_HTML_UPLOADED_SUCCESSFULLY,
    )

    return { fileName }
  }
}
