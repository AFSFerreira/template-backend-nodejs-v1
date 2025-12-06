import type {
  FindMeetingByPublicIdUseCaseRequest,
  FindMeetingByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/meeting/find-by-public-id'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import { ensureExists } from '@utils/guards/ensure'
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

    return { meeting }
  }
}
