import type {
  ExportMeetingEnrollmentsUseCaseRequest,
  ExportMeetingEnrollmentsUseCaseResponse,
} from '@custom-types/use-cases/meeting-enrollment/export-meeting-enrollments'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_ENROLLMENTS_EXPORT_STARTED } from '@messages/loggings/models/meeting-enrollment-loggings'
import { ExcelExportService } from '@services/exporters/excel-export-service'
import { generateTimestamp } from '@utils/dates/generate-timestamp'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportMeetingEnrollmentsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute(
    _exportMeetingEnrollmentsUseCaseInput: ExportMeetingEnrollmentsUseCaseRequest,
  ): Promise<ExportMeetingEnrollmentsUseCaseResponse> {
    const enrollmentStream = this.meetingEnrollmentsRepository.streamAllEnrollments()

    const excelService = new ExcelExportService()

    const passThrough = excelService.generateMeetingEnrollmentReport(enrollmentStream)

    const filename = `inscricoes-reunioes_${generateTimestamp()}.xlsx`

    logger.info(MEETING_ENROLLMENTS_EXPORT_STARTED)

    return { reportStream: passThrough, filename }
  }
}
