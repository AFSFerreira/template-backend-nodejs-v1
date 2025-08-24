import type { UsersRepository } from '@repositories/users-repository'

interface CheckEmailAvailabilityUseCaseRequest {
  email: string
}

interface CheckEmailAvailabilityUseCaseResponse {
  available: boolean
}

export class CheckEmailAvailabilityUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
  }: CheckEmailAvailabilityUseCaseRequest): Promise<CheckEmailAvailabilityUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    return { available: !user }
  }
}
