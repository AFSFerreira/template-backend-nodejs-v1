import type {
  FindUserByPublicIdUseCaseRequest,
  FindUserByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/user/find-by-public-id'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class FindUserByPublicIdUseCase {
  constructor(
    @inject(tokens.repositories.users)
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
