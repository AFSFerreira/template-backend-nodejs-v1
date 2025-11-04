import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { ListOngoingMeetingsUseCase } from '../../meeting/list-ongoing-meetings'

export function makeListOngoingMeetingsUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository()
  const listOngoingMeetingsUseCase = new ListOngoingMeetingsUseCase(meetingsRepository)

  return listOngoingMeetingsUseCase
}
