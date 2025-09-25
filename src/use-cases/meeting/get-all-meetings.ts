import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { Meeting } from '@prisma/client'
import type { MeetingRepository } from '@repositories/meetings-repository'
import type { GetAllMeetingsQuerySchemaType } from '@schemas/meeting/get-all-meetings-query-schema'

interface GetAllMeetingsUseCaseRequest extends GetAllMeetingsQuerySchemaType {}

interface GetAllMeetingsUseCaseResponse {
  data: Meeting[]
  meta: PaginationMetaType
}

export class GetAllMeetingsUseCase {
  constructor(private readonly meetingRepository: MeetingRepository) {}

  async execute(getAllMeetingsUseCaseInput: GetAllMeetingsUseCaseRequest): Promise<GetAllMeetingsUseCaseResponse> {
    const meetingsInfo = await this.meetingRepository.listAllMeetings(getAllMeetingsUseCaseInput)

    return meetingsInfo
  }
}
