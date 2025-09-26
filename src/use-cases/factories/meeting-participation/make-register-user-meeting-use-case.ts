import { PrismaMeetingParticipantsRepository } from '@repositories/prisma/prisma-meeting-participants-repository'
import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUserMeetingUseCase } from '@use-cases/meeting-participation/register-user-meeting'

export function makeRegisterUserMeetingUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const meetingsRepository = new PrismaMeetingsRepository()
  const meetingParticipantsRepository = new PrismaMeetingParticipantsRepository()

  const registerUserMeetingUseCase = new RegisterUserMeetingUseCase(
    usersRepository,
    meetingsRepository,
    meetingParticipantsRepository,
  )

  return registerUserMeetingUseCase
}
