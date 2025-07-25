import { UserNotFoundError } from '../errors/user-not-found-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { UsersRepository } from '@/repositories/users-repository'

interface FindByIdUseCaseRequest {
  id: string
}

interface FindByIdUseCaseResponse {
  user: UserWithDetails
}

export class FindByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    id,
  }: FindByIdUseCaseRequest): Promise<FindByIdUseCaseResponse> {
    const user = await this.usersRepository.findBy({ id })

    if (user === null) throw new UserNotFoundError()

    return { user }
  }
}
