import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

interface FindMeetingByPublicIdUseCaseRequest {
  publicId: string
}

interface FindMeetingByPublicIdUseCaseResponse {
  meeting: MeetingWithDetails
}

export class FindMeetingByPublicIdUseCase {
  constructor(private readonly MeetingsRepository: MeetingsRepository) {}

  async execute({ publicId }: FindMeetingByPublicIdUseCaseRequest): Promise<FindMeetingByPublicIdUseCaseResponse> {
    const meeting = await this.MeetingsRepository.findByPublicId(publicId)

    if (!meeting) {
      throw new MeetingNotFoundError()
    }

    return { meeting }
  }
}
