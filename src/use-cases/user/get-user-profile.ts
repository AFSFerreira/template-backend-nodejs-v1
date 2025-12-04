import type {
  GetUserProfileUseCaseRequest,
  GetUserProfileUseCaseResponse,
} from '@custom-types/use-cases/user/get-user-profile'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ publicId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByPublicId(publicId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
