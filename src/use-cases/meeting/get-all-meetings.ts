import type {
  GetAllMeetingsUseCaseRequest,
  GetAllMeetingsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-all-meetings'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllMeetingsUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly MeetingsRepository: MeetingsRepository,
  ) {}

  async execute(getAllMeetingsUseCaseInput: GetAllMeetingsUseCaseRequest): Promise<GetAllMeetingsUseCaseResponse> {
    const meetingsInfo = await this.MeetingsRepository.listAllMeetings(getAllMeetingsUseCaseInput)

    return meetingsInfo
  }
}
