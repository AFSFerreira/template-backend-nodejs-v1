import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

interface FindUserByPublicIdUseCaseRequest {
  publicId: string
}

interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetails
}

export class FindUserByPublicIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    publicId,
  }: FindUserByPublicIdUseCaseRequest): Promise<FindUserByPublicIdUseCaseResponse> {
    const user = await this.usersRepository.findByPublicId(publicId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
