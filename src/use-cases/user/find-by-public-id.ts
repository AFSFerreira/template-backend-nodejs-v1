import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/ensure'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

interface FindUserByPublicIdUseCaseRequest {
  publicId: string
}

interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetails
}

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
