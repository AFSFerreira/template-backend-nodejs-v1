import type {
  GetAllUsersCaseResponse,
  GetAllUsersDetailedUseCaseRequest,
} from '@custom-types/use-cases/user/get-all-users-detailed'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllUsersDetailedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(getAllUsersUseCaseInput: GetAllUsersDetailedUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsersDetailed(getAllUsersUseCaseInput)

    return usersInfo
  }
}
