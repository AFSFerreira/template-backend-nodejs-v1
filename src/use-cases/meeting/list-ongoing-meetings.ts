import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { ListOngoingMeetingsQuerySchemaType } from '@schemas/meeting/list-ongoing-meetings-query-schema'

interface ListOngoingMeetingsUseCaseRequest extends ListOngoingMeetingsQuerySchemaType {}

interface ListOngoingMeetingsUseCaseResponse {
  data: MeetingWithDetails[]
  meta: PaginationMetaType
}

export class ListOngoingMeetingsUseCase {
  constructor(private readonly meetingsRepository: MeetingsRepository) {}

  async execute(listOngoingMeetingsUseCaseInput: ListOngoingMeetingsUseCaseRequest): Promise<ListOngoingMeetingsUseCaseResponse> {
    const meetings = await this.meetingsRepository.listOngoingMeetings(listOngoingMeetingsUseCaseInput)

    return meetings
  }
}
