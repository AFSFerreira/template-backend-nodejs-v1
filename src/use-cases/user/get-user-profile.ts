import type {
  GetUserProfileUseCaseRequest,
  GetUserProfileUseCaseResponse,
} from '@custom-types/use-cases/user/get-user-profile'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { UsersRepository } from '@repositories/users-repository'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByPublicId(publicId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
