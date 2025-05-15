import type { GetAllUsersCaseResponse, GetAllUsersUseCaseRequest } from '@custom-types/use-cases/user/get-all-users'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllUsersUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(getAllUsersUseCaseInput: GetAllUsersUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsers(getAllUsersUseCaseInput)

    return simplifiedUsersInfo as GetAllUsersCaseResponse
  }
}
