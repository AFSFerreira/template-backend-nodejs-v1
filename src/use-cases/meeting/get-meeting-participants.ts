import type {
  GetMeetingParticipantsUseCaseRequest,
  GetMeetingParticipantsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-meeting-participants'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetMeetingParticipantsUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tokens.repositories.meetingParticipants)
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository,
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

    const participantsInfo = await this.meetingParticipantsRepository.listMeetingParticipants({
      meetingId: meeting.id,
      page,
      limit,
    })

    return participantsInfo
  }
}
