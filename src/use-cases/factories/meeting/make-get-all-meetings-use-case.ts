import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { GetAllMeetingsUseCase } from '@use-cases/meeting/get-all-meetings'

export function makeGetAllMeetingsUseCase() {
  const MeetingsRepository = new PrismaMeetingsRepository()
  const getAllMeetingsUseCase = new GetAllMeetingsUseCase(MeetingsRepository)

  return getAllMeetingsUseCase
}
