import type {
  GetMeetingParticipantsUseCaseRequest,
  GetMeetingParticipantsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-meeting-participants'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetMeetingParticipantsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute({
    meetingPublicId,
    page,
    limit,
  }: GetMeetingParticipantsUseCaseRequest): Promise<GetMeetingParticipantsUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(meetingPublicId),
      error: new MeetingNotFoundError(),
    })

    const enrollmentsInfo = await this.meetingEnrollmentsRepository.listMeetingEnrollments({
      meetingId: meeting.id,
      page,
      limit,
    })

    return enrollmentsInfo
  }
}
