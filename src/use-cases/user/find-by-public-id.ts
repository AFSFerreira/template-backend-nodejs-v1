import type {
  FindUserByPublicIdUseCaseRequest,
  FindUserByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/user/find-by-public-id'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
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

    return { user }
  }
}
