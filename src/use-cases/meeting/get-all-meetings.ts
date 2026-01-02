import type {
  GetAllMeetingsUseCaseRequest,
  GetAllMeetingsUseCaseResponse,
} from '@custom-types/use-cases/meeting/get-all-meetings'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllMeetingsUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly MeetingsRepository: MeetingsRepository,
  ) {}

  async execute(getAllMeetingsUseCaseInput: GetAllMeetingsUseCaseRequest): Promise<GetAllMeetingsUseCaseResponse> {
    const meetingsInfo = await this.MeetingsRepository.listAllMeetings(getAllMeetingsUseCaseInput)

    return {
      ...meetingsInfo,
      data: meetingsInfo.data.map((meeting) => ({
        ...meeting,
        bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
      })),
    }
  }
}
