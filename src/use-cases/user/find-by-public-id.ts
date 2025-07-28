import { UserNotFoundError } from '../errors/user-not-found-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { UsersRepository } from '@/repositories/users-repository'

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
    const user = await this.usersRepository.findBy({ publicId })

    if (user === null) throw new UserNotFoundError()

    return { user }
  }
}
