import type {
  FindUserByIdUseCaseRequest,
  FindUserByIdUseCaseResponse,
} from '@custom-types/use-cases/user/find-by-public-id'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class FindUserByIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findById(id),
      error: new UserNotFoundError(),
    })

    return { user }
  }
}
