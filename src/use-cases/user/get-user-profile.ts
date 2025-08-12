import { UserNotFoundError } from '../errors/user-not-found-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { UsersRepository } from '@/repositories/users-repository'

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

    if (user === null) throw new UserNotFoundError()

    return { user }
  }
}
