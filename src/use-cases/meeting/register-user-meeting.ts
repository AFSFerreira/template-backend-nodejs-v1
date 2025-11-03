import type { MeetingParticipation } from '@prisma/client'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { RegisterUserMeetingBodySchemaType } from '@schemas/meeting/register-user-meeting-body-schema'
import { MeetingNotFoundError } from '@use-cases/errors/meeting/meeting-not-found-error'
import { MeetingAlreadyFinishedError } from '@use-cases/errors/meeting-participation/meeting-already-finished-error'
import { UserAlreadyRegisteredInMeetingError } from '@use-cases/errors/meeting-participation/user-already-registered-in-meeting-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists, ensureNotExists } from '@utils/ensure'
import { toDateOnly } from '@utils/to-date-only'

interface RegisterUserMeetingUseCaseRequest extends RegisterUserMeetingBodySchemaType {
  userId: string
  meetingId: string
}

interface RegisterUserMeetingUseCaseResponse {
  meetingParticipation: MeetingParticipation
}

export class RegisterUserMeetingUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly meetingsRepository: MeetingsRepository,
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository,
  ) {}

  async execute(
    registerUserMeetingUseCaseInput: RegisterUserMeetingUseCaseRequest,
  ): Promise<RegisterUserMeetingUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(registerUserMeetingUseCaseInput.userId),
      error: new UserNotFoundError(),
    })

    const meeting = ensureExists({
      value: await this.meetingsRepository.findByPublicId(registerUserMeetingUseCaseInput.meetingId),
      error: new MeetingNotFoundError(),
    })

    if (toDateOnly(new Date()) > toDateOnly(meeting.lastDate)) {
      throw new MeetingAlreadyFinishedError()
    }

    console.log("chegou aquoi1")

    ensureNotExists({
      value: await this.meetingParticipantsRepository.findByUserIdAndMeetingId({
        meetingId: meeting.id,
        userId: user.id,
      }),
      error: new UserAlreadyRegisteredInMeetingError(),
    })

    console.log("passou do check")

    const meetingParticipation = await this.meetingParticipantsRepository.createForUser({
      ...registerUserMeetingUseCaseInput,
      meetingId: meeting.id,
      userId: user.id,
    })

    return { meetingParticipation }
  }
}
