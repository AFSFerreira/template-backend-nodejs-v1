import { PrismaMeetingRepository } from '@repositories/prisma/prisma-meeting-repository'
import { FindMeetingByPublicIdUseCase } from '@use-cases/meeting/find-by-public-id'

export function makeFindMeetingByPublicIdUseCase() {
  const meetingRepository = new PrismaMeetingRepository()
  const findMeetingByPublicIdUseCase = new FindMeetingByPublicIdUseCase(meetingRepository)

  return findMeetingByPublicIdUseCase
}
