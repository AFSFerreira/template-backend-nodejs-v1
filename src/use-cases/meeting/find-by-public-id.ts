import type {
  FindMeetingByPublicIdUseCaseRequest,
  FindMeetingByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/meeting/find-by-public-id'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

@injectable()
export class FindMeetingByPublicIdUseCase {
  constructor(
    @inject(tokens.repositories.meetings)
    private readonly MeetingsRepository: MeetingsRepository,
  ) {}

  async execute({ publicId }: FindMeetingByPublicIdUseCaseRequest): Promise<FindMeetingByPublicIdUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.MeetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    return {
      meeting: {
        ...meeting,
        bannerImage: buildMeetingBannerUrl(meeting.bannerImage),
      },
    }
  }
}
