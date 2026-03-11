import type {
  GetMeetingParticipantsUseCaseRequest,
  GetMeetingParticipantsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-meeting-participants'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetMeetingParticipantsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute(
    getMeetingParticipantsUseCaseInput: GetMeetingParticipantsUseCaseRequest,
  ): Promise<GetMeetingParticipantsUseCaseResponse> {
    const { meetingPublicId, ...query } = getMeetingParticipantsUseCaseInput

    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(meetingPublicId),
      error: new MeetingNotFoundError(),
    })

    const enrollmentsInfo = await this.meetingEnrollmentsRepository.listMeetingEnrollments({
      ...query,
      meetingId: meeting.id,
    })

    return enrollmentsInfo
  }
}
