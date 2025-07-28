import { UserNotFoundError } from '../errors/user-not-found-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { UsersRepository } from '@/repositories/users-repository'

interface FindUserByIdUseCaseRequest {
  publicId: string
}

interface FindUserByIdUseCaseResponse {
  user: UserWithDetails
}

export class FindUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    publicId,
  }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findBy({ publicId })

    if (user === null) throw new UserNotFoundError()

    return { user }
  }
}
