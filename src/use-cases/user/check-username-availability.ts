import type { UsersRepository } from '@repositories/users-repository'

interface CheckUsernameAvailabilityUseCaseRequest {
  username: string
}

interface CheckUsernameAvailabilityUseCaseResponse {
  available: boolean
}

export class CheckUsernameAvailabilityUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    username,
  }: CheckUsernameAvailabilityUseCaseRequest): Promise<CheckUsernameAvailabilityUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username)
    return { available: !user }
  }
}
