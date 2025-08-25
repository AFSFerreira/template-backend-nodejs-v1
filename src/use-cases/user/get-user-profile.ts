import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface GetUserProfileUseCaseRequest {
  publicId: string
}

interface GetUserProfileUseCaseResponse {
  user: UserWithDetails
}

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    publicId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByPublicId(publicId)

    if (!user) throw new UserNotFoundError()

    return { user }
  }
}
