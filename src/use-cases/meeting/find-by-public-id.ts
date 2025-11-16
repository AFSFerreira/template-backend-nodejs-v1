import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { ensureExists } from '@utils/ensure'
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
    const meeting = ensureExists({
      value: await this.MeetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    return { meeting }
  }
}
