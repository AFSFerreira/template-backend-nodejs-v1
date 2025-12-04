import type {
  FindMeetingByPublicIdUseCaseRequest,
  FindMeetingByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/meeting/find-by-public-id'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { ensureExists } from '@utils/guards/ensure'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

export class FindMeetingByPublicIdUseCase {
  constructor(private readonly MeetingsRepository: MeetingsRepository) {}

  async execute({ publicId }: FindMeetingByPublicIdUseCaseRequest): Promise<FindMeetingByPublicIdUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.MeetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    return { meeting }
  }
}
