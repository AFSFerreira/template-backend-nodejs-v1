import type {
  DeleteMeetingEnrollmentUseCaseRequest,
  DeleteMeetingEnrollmentUseCaseResponse,
} from '@custom-types/use-cases/meeting-enrollment/delete-meeting-enrollment'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MEETING_ENROLLMENT_DELETION_SUCCESSFUL } from '@messages/loggings/models/meeting-enrollment-loggings'
import { MeetingEnrollmentNotFoundError } from '@use-cases/errors/meeting-enrollment/meeting-enrollment-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteMeetingEnrollmentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute({ publicId }: DeleteMeetingEnrollmentUseCaseRequest): Promise<DeleteMeetingEnrollmentUseCaseResponse> {
    const enrollment = ensureExists({
      value: await this.meetingEnrollmentsRepository.findByPublicId(publicId),
      error: new MeetingEnrollmentNotFoundError(),
    })

    await this.meetingEnrollmentsRepository.deleteById(enrollment.id)

    logger.info({ enrollmentId: enrollment.publicId }, MEETING_ENROLLMENT_DELETION_SUCCESSFUL)

    return {}
  }
}
