import type { PassThrough } from 'node:stream'
import type {
  ExportMeetingEnrollmentsUseCaseRequest,
  ExportMeetingEnrollmentsUseCaseResponse,
} from '@custom-types/use-cases/meeting-enrollment/export-meeting-enrollments'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_ENROLLMENTS_EXPORT_STARTED } from '@messages/loggings/models/meeting-enrollment-loggings'
import { CsvExportService } from '@services/exporters/csv-export-service'
import { ExcelExportService } from '@services/exporters/excel-export-service'
import { generateTimestamp } from '@utils/dates/generate-timestamp'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

@singleton()
export class ExportMeetingEnrollmentsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(CsvExportService)
    private readonly csvExportService: CsvExportService,

    @inject(ExcelExportService)
    private readonly excelExportService: ExcelExportService,
  ) {}

  async execute({
    meetingPublicId,
    format,
  }: ExportMeetingEnrollmentsUseCaseRequest): Promise<ExportMeetingEnrollmentsUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(meetingPublicId),
      error: new MeetingNotFoundError(),
    })

    const enrollmentStream = this.meetingEnrollmentsRepository.streamAllEnrollments({
      where: { meetingId: meeting.id },
    })

    let reportStream: PassThrough

    switch (format) {
      case 'xlsx': {
        reportStream = this.excelExportService.generateMeetingEnrollmentReport(enrollmentStream)
        break
      }
      case 'csv': {
        reportStream = this.csvExportService.generateMeetingEnrollmentReport(enrollmentStream)
        break
      }
      default: {
        throw new UnreachableCaseError(format satisfies never)
      }
    }

    const filename = `inscricoes-${meeting.title.replaceAll(' ', '-')}_${generateTimestamp()}.${format}`

    logger.info(MEETING_ENROLLMENTS_EXPORT_STARTED)

    return { reportStream, filename }
  }
}
