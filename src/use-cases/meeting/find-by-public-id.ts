import type {
  FindMeetingByPublicIdUseCaseRequest,
  FindMeetingByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/meeting/find-by-public-id'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { MeetingNotFoundError } from '../errors/meeting/meeting-not-found-error'

@injectable()
export class FindMeetingByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly MeetingsRepository: MeetingsRepository,
  ) {}

  async execute({ publicId }: FindMeetingByPublicIdUseCaseRequest): Promise<FindMeetingByPublicIdUseCaseResponse> {
    const meeting = ensureExists({
      value: await this.MeetingsRepository.findByPublicId(publicId),
      error: new MeetingNotFoundError(),
    })

    return { meeting }
  }
}
