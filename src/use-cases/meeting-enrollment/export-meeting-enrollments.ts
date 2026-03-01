import type {
  ExportMeetingEnrollmentsUseCaseRequest,
  ExportMeetingEnrollmentsUseCaseResponse,
} from '@custom-types/use-cases/meeting-enrollment/export-meeting-enrollments'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_ENROLLMENTS_EXPORT_STARTED } from '@messages/loggings/models/meeting-enrollment-loggings'
import { ExcelExportService } from '@services/exporters/excel-export-service'
import { generateTimestamp } from '@utils/dates/generate-timestamp'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

@injectable()
export class ExportMeetingEnrollmentsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute({
    meetingPublicId,
  }: ExportMeetingEnrollmentsUseCaseRequest): Promise<ExportMeetingEnrollmentsUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(meetingPublicId),
      error: new MeetingNotFoundError(),
    })

    const enrollmentStream = this.meetingEnrollmentsRepository.streamAllEnrollments({
      where: { meetingId: meeting.id },
    })

    const excelService = new ExcelExportService()

    const passThrough = excelService.generateMeetingEnrollmentReport(enrollmentStream)

    const filename = `inscricoes-${meeting.title.replaceAll(' ', '-')}_${generateTimestamp()}.xlsx`

    logger.info(MEETING_ENROLLMENTS_EXPORT_STARTED)

    return { reportStream: passThrough, filename }
  }
}
