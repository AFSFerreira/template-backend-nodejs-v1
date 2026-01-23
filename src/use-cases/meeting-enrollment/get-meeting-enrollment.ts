import type {
  GetMeetingEnrollmentUseCaseRequest,
  GetMeetingEnrollmentUseCaseResponse,
} from '@custom-types/use-cases/meeting-enrollment/get-meeting-enrollment'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingEnrollmentNotFoundError } from '@use-cases/errors/meeting-enrollment/meeting-enrollment-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetMeetingEnrollmentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute({ publicId }: GetMeetingEnrollmentUseCaseRequest): Promise<GetMeetingEnrollmentUseCaseResponse> {
    const enrollment = ensureExists({
      value: await this.meetingEnrollmentsRepository.findByPublicId(publicId),
      error: new MeetingEnrollmentNotFoundError(),
    })

    return { enrollment }
  }
}
