import type {
  UploadNewsletterHtmlUseCaseRequest,
  UploadNewsletterHtmlUseCaseResponse,
} from '@custom-types/use-cases/newsletters/upload-newsletter-html'
import { NEWSLETTER_TEMP_HTML_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { NEWSLETTER_HTML_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import { saveFile } from '@services/files/save-file'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { FileTooBigError } from '@use-cases/errors/newsletter/file-too-big-error'
import { injectable } from 'tsyringe'

@injectable()
export class UploadNewsletterHtmlUseCase {
  async execute({ filePart }: UploadNewsletterHtmlUseCaseRequest): Promise<UploadNewsletterHtmlUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new FileTooBigError()
    }

    const { filename, success } = await saveFile({
      filePart,
      baseFolder: NEWSLETTER_TEMP_HTML_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new FileTooBigError()
    }

    logger.info(
      {
        filename,
      },
      NEWSLETTER_HTML_UPLOADED_SUCCESSFULLY,
    )

    return { filename }
  }
}
