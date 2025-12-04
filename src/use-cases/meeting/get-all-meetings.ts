import type {
  GetAllMeetingsUseCaseRequest,
  GetAllMeetingsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-all-meetings'
import type { MeetingsRepository } from '@repositories/meetings-repository'

export class GetAllMeetingsUseCase {
  constructor(private readonly MeetingsRepository: MeetingsRepository) {}

  async execute(getAllMeetingsUseCaseInput: GetAllMeetingsUseCaseRequest): Promise<GetAllMeetingsUseCaseResponse> {
    const meetingsInfo = await this.MeetingsRepository.listAllMeetings(getAllMeetingsUseCaseInput)

    return meetingsInfo
  }
}
