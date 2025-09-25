import { PrismaMeetingRepository } from '@repositories/prisma/prisma-meeting-repository'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'

export function makeGetAllMeetingsUseCase() {
  const meetingRepository = new PrismaMeetingRepository()
  const getAllMeetingsUseCase = new GetAllMeetingsUseCase(meetingRepository)

  return getAllMeetingsUseCase
}
