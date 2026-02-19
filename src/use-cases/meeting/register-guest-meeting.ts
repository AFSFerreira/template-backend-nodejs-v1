import type {
  RegisterGuestMeetingUseCaseRequest,
  RegisterGuestMeetingUseCaseResponse,
} from '@custom-types/use-cases/meeting/register-guest-meeting'
import type { MeetingEnrollmentsRepository } from '@repositories/meeting-enrollments-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { REGISTER_GUEST_MEETING } from '@messages/loggings/models/meeting-loggings'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { GuestAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/guest-already-registered-in-meeting-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { toDateOnly } from '@utils/formatters/to-date-only'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { hasValidMxRecord } from '@utils/validators/validate-mx-record'
import { inject, injectable } from 'tsyringe'
import { InvalidEmailDomainError } from '../errors/user/invalid-email-domain-error'

@injectable()
export class RegisterGuestMeetingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(tsyringeTokens.repositories.meetingEnrollments)
    private readonly meetingEnrollmentsRepository: MeetingEnrollmentsRepository,
  ) {}

  async execute(
    registerGuestMeetingUseCaseInput: RegisterGuestMeetingUseCaseRequest,
  ): Promise<RegisterGuestMeetingUseCaseResponse> {
    const isValidEmailDomain = await hasValidMxRecord(registerGuestMeetingUseCaseInput.email)

    if (!isValidEmailDomain) {
      throw new InvalidEmailDomainError()
    }

    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(registerGuestMeetingUseCaseInput.meetingId),
      error: new MeetingNotFoundError(),
    })

    if (toDateOnly(new Date()) > toDateOnly(meeting.lastDate)) {
      throw new MeetingAlreadyFinishedError()
    }

    ensureNotExists({
      value: await this.meetingEnrollmentsRepository.findByGuestEmailAndMeetingId({
        email: registerGuestMeetingUseCaseInput.email,
        meetingId: meeting.id,
      }),
      error: new GuestAlreadyRegisteredInMeetingError(),
    })

    const meetingEnrollment = await this.meetingEnrollmentsRepository.createForGuest({
      ...registerGuestMeetingUseCaseInput,
      meetingId: meeting.id,
    })

    logger.info(
      {
        guestEmail: registerGuestMeetingUseCaseInput.email,
        fullName: registerGuestMeetingUseCaseInput.fullName,
      },
      REGISTER_GUEST_MEETING,
    )

    return { meetingEnrollment }
  }
}
