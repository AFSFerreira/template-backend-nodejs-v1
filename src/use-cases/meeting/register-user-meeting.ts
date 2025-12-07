import type {
  RegisterUserMeetingUseCaseRequest,
  RegisterUserMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/register-user-meeting'
import { logger } from '@lib/logger'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { REGISTER_USER_MEETING } from '@messages/loggings'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { UserAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/user-already-registered-in-meeting-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { toDateOnly } from '@utils/formatters/to-date-only'
import { ensureExists, ensureNotExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RegisterUserMeetingUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tokens.repositories.meetingParticipants)
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    registerUserMeetingUseCaseInput: RegisterUserMeetingUseCaseRequest,
  ): Promise<RegisterUserMeetingUseCaseResponse> {
    const { user, participation: meetingParticipation } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(registerUserMeetingUseCaseInput.userPublicId),
        error: new UserNotFoundError(),
      })

      const meeting = ensureExists({
        value: await this.meetingsRepository.findByPublicId(registerUserMeetingUseCaseInput.meetingId),
        error: new MeetingNotFoundError(),
      })

      if (toDateOnly(new Date()) > toDateOnly(meeting.lastDate)) {
        throw new MeetingAlreadyFinishedError()
      }

      ensureNotExists({
        value: await this.meetingParticipantsRepository.findByUserIdAndMeetingId({
          meetingId: meeting.id,
          userId: user.id,
        }),
        error: new UserAlreadyRegisteredInMeetingError(),
      })

      const participation = await this.meetingParticipantsRepository.createForUser({
        ...registerUserMeetingUseCaseInput,
        meetingId: meeting.id,
        userId: user.id,
      })

      return { user, participation }
    })

    logger.info({ meetingId: registerUserMeetingUseCaseInput.meetingId, userId: user.id }, REGISTER_USER_MEETING)

    return { meetingParticipation }
  }
}
