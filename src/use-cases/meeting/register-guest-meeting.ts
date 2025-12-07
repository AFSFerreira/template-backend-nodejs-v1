import type {
  RegisterGuestMeetingUseCaseRequest,
  RegisterGuestMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/register-guest-meeting'
import { logger } from '@lib/logger'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { REGISTER_GUEST_MEETING } from '@messages/loggings'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { GuestAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/guest-already-registered-in-meeting-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { toDateOnly } from '@utils/formatters/to-date-only'
import { ensureExists, ensureNotExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RegisterGuestMeetingUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tokens.repositories.meetingParticipants)
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    registerGuestMeetingUseCaseInput: RegisterGuestMeetingUseCaseRequest,
  ): Promise<RegisterGuestMeetingUseCaseResponse> {
    const meetingParticipation = await this.dbContext.runInTransaction(async () => {
      const meeting = ensureExists({
        value: await this.meetingsRepository.findByPublicId(registerGuestMeetingUseCaseInput.meetingId),
        error: new MeetingNotFoundError(),
      })

      if (toDateOnly(new Date()) > toDateOnly(meeting.lastDate)) {
        throw new MeetingAlreadyFinishedError()
      }

      ensureNotExists({
        value: await this.meetingParticipantsRepository.findByGuestEmailAndMeetingId({
          email: registerGuestMeetingUseCaseInput.email,
          meetingId: meeting.id,
        }),
        error: new GuestAlreadyRegisteredInMeetingError(),
      })

      const participation = await this.meetingParticipantsRepository.createForGuest({
        ...registerGuestMeetingUseCaseInput,
        meetingId: meeting.id,
      })

      return participation
    })

    logger.info(
      {
        guestEmail: registerGuestMeetingUseCaseInput.email,
        fullName: registerGuestMeetingUseCaseInput.fullName,
      },
      REGISTER_GUEST_MEETING,
    )

    return { meetingParticipation }
  }
}
