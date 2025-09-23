import type { UsersRepository } from '@repositories/users-repository'

// interface UpdateUserUseCaseRequest extends

export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(updateUserUseCaseInput) {}
}
