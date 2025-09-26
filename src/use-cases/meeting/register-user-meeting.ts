import type { MeetingParticipation } from "@prisma/client"
import type { MeetingParticipantsRepository } from "@repositories/meeting-participants-repository"
import type { MeetingsRepository } from "@repositories/meetings-repository"
import type { UsersRepository } from "@repositories/users-repository"
import type { RegisterUserMeetingBodySchemaType } from "@schemas/meeting/register-user-meeting-body-schema"
import { MeetingAlreadyFinishedError } from "@use-cases/errors/meeting-participation/meeting-already-finished-error"
import { UserAlreadyRegisteredInMeetingError } from "@use-cases/errors/meeting-participation/user-already-registered-in-meeting-error"
import { MeetingNotFoundError } from "@use-cases/errors/meeting/meeting-not-found-error"
import { UserNotFoundError } from "@use-cases/errors/user/user-not-found-error"
import { toDateOnly } from "@utils/to-date-only"

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
    private readonly meetingParticipantsRepository: MeetingParticipantsRepository
  ) {}

  async execute(registerUserMeetingUseCaseInput: RegisterUserMeetingUseCaseRequest): Promise<RegisterUserMeetingUseCaseResponse> {
    const user = await this.usersRepository.findByPublicId(registerUserMeetingUseCaseInput.userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meeting = await this.meetingsRepository.findByPublicId(registerUserMeetingUseCaseInput.meetingId)

    if (!meeting) {
      throw new MeetingNotFoundError()
    }

    if (toDateOnly(new Date()) > toDateOnly(meeting.lastDate)) {
      throw new MeetingAlreadyFinishedError()
    }

    const userAlreadyRegistered = await this.meetingParticipantsRepository.findByUserAndMeeting({
      meetingId: meeting.id,
      userId: user.id,
    })

    if (userAlreadyRegistered) {
      throw new UserAlreadyRegisteredInMeetingError()
    }

    const meetingParticipation = await this.meetingParticipantsRepository.createForUser({
      ...registerUserMeetingUseCaseInput,
      meetingId: meeting.id,
      userId: user.id,
    })

    return { meetingParticipation }
  }
}
