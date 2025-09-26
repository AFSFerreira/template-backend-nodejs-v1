import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'

export function makeFindMeetingByPublicIdUseCase() {
  const MeetingsRepository = new PrismaMeetingsRepository()
  const findMeetingByPublicIdUseCase = new FindMeetingByPublicIdUseCase(MeetingsRepository)

  return findMeetingByPublicIdUseCase
}
