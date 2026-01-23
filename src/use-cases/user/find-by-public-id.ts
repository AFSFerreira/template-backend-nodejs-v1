import type {
  FindUserByPublicIdUseCaseRequest,
  FindUserByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/user/find-by-public-id'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class FindUserByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId }: FindUserByPublicIdUseCaseRequest): Promise<FindUserByPublicIdUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
