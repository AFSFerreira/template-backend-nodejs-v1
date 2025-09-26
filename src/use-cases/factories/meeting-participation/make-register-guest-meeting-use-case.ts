import { PrismaMeetingParticipantsRepository } from '@repositories/prisma/prisma-meeting-participants-repository'
import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { RegisterGuestMeetingUseCase } from '@use-cases/meeting-participation/register-guest-meeting'

export function makeRegisterGuestMeetingUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const meetingParticipantsRepository = new PrismaMeetingParticipantsRepository()

  const registerGuestMeetingUseCase = new RegisterGuestMeetingUseCase(
    meetingsRepository,
    meetingParticipantsRepository
  )

  return registerGuestMeetingUseCase
}
