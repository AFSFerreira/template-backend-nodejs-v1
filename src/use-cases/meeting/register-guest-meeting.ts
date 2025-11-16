import { logger } from '@lib/logger'
import { REGISTER_GUEST_MEETING } from '@messages/loggings'
import type { MeetingParticipation } from '@prisma/client'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { RegisterGuestMeetingBodySchemaType } from '@schemas/meeting/register-guest-meeting-body-schema'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { GuestAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/guest-already-registered-in-meeting-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { ensureExists, ensureNotExists } from '@utils/ensure'
import { toDateOnly } from '@utils/to-date-only'

interface RegisterUserMeetingUseCaseRequest extends RegisterGuestMeetingBodySchemaType {
  meetingId: string
}

interface RegisterUserMeetingUseCaseResponse {
  meetingParticipation: MeetingParticipation
}

export class RegisterGuestMeetingUseCase {
  constructor(
    private readonly meetingsRepository: MeetingsRepository,
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository,
  ) {}

  async execute(
    registerGuestMeetingUseCaseInput: RegisterUserMeetingUseCaseRequest,
  ): Promise<RegisterUserMeetingUseCaseResponse> {
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

    const meetingParticipation = await this.meetingParticipantsRepository.createForGuest({
      ...registerGuestMeetingUseCaseInput,
      meetingId: meeting.id,
    })

    logger.info(
      {
        meetingId: meeting.id,
        guestEmail: registerGuestMeetingUseCaseInput.email,
        fullName: registerGuestMeetingUseCaseInput.fullName,
      },
      REGISTER_GUEST_MEETING,
    )

    return { meetingParticipation }
  }
}
