import type {
  FindUserByPublicIdUseCaseRequest,
  FindUserByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/user/find-by-public-id'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/guards/ensure'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

export class FindUserByPublicIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ publicId }: FindUserByPublicIdUseCaseRequest): Promise<FindUserByPublicIdUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    return { user }
  }
}
