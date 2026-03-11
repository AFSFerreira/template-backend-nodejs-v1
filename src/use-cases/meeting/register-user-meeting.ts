import type {
  RegisterUserMeetingUseCaseRequest,
  RegisterUserMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/register-user-meeting'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { REGISTER_USER_MEETING } from '@messages/loggings/models/meeting-loggings'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { UserAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/user-already-registered-in-meeting-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { toDateOnlyUTC } from '@utils/formatters/to-date-only'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterUserMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute(
    registerUserMeetingUseCaseInput: RegisterUserMeetingUseCaseRequest,
  ): Promise<RegisterUserMeetingUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(registerUserMeetingUseCaseInput.userPublicId),
      error: new UserNotFoundError(),
    })

    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(registerUserMeetingUseCaseInput.meetingId),
      error: new MeetingNotFoundError(),
    })

    if (toDateOnlyUTC(new Date()) > toDateOnlyUTC(meeting.lastDate)) {
      throw new MeetingAlreadyFinishedError()
    }

    ensureNotExists({
      value: await this.meetingEnrollmentsRepository.findByUserIdAndMeetingId({
        meetingId: meeting.id,
        userId: user.id,
      }),
      error: new UserAlreadyRegisteredInMeetingError(),
    })

    const meetingEnrollment = await this.meetingEnrollmentsRepository.createForUser({
      ...registerUserMeetingUseCaseInput,
      meetingId: meeting.id,
      userId: user.id,
    })

    logger.info({ meetingId: registerUserMeetingUseCaseInput.meetingId }, REGISTER_USER_MEETING)

    return { meetingEnrollment }
  }
}
