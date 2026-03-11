import type {
  UploadMeetingAgendaUseCaseRequest,
  UploadMeetingAgendaUseCaseResponse,
} from '@custom-types/use-cases/meeting/upload-meeting-agenda'
import { MEETING_TEMP_AGENDAS_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { MEETING_AGENDA_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/meeting-loggings'
import { FileService } from '@services/files/file-service'
import { FileTooBigError } from '@use-cases/errors/generic/file-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadMeetingAgendaUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ filePart }: UploadMeetingAgendaUseCaseRequest): Promise<UploadMeetingAgendaUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new FileTooBigError()
    }

    const { filename, success } = await this.fileService.saveFile({
      filePart: filePart,
      baseFolder: MEETING_TEMP_AGENDAS_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new FileTooBigError()
    }

    logger.info(
      {
        filename,
      },
      MEETING_AGENDA_UPLOADED_SUCCESSFULLY,
    )

    return { filename }
  }
}
