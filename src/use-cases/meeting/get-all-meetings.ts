import type {
  GetAllMeetingsUseCaseRequest,
  GetAllMeetingsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-all-meetings'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllMeetingsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly MeetingsRepository: MeetingsRepository,
  ) {}

  async execute(getAllMeetingsUseCaseInput: GetAllMeetingsUseCaseRequest): Promise<GetAllMeetingsUseCaseResponse> {
    const meetingsInfo = await this.MeetingsRepository.listAllMeetings(getAllMeetingsUseCaseInput)

    return meetingsInfo
  }
}
