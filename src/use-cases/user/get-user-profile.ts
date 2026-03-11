import type {
  GetUserProfileUseCaseRequest,
  GetUserProfileUseCaseResponse,
} from '@custom-types/use-cases/user/get-user-profile'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class GetUserProfileUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    return { user }
  }
}
