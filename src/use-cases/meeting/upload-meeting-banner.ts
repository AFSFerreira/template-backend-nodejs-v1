import type {
  UploadMeetingBannerUseCaseRequest,
  UploadMeetingBannerUseCaseResponse,
} from '@custom-types/use-cases/meeting/upload-meeting-banner'
import { MEETING_TEMP_BANNERS_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { MEETING_BANNER_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadMeetingBannerUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ filePart }: UploadMeetingBannerUseCaseRequest): Promise<UploadMeetingBannerUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart: filePart,
      folderPath: MEETING_TEMP_BANNERS_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    logger.info(
      {
        filename,
      },
      MEETING_BANNER_UPLOADED_SUCCESSFULLY,
    )

    return { filename }
  }
}
