import type {
  GetUserProfileUseCaseRequest,
  GetUserProfileUseCaseResponse,
} from '@custom-types/use-cases/user/get-user-profile'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
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

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
