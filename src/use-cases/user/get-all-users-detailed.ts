import type {
  GetAllUsersCaseResponse,
  GetAllUsersDetailedUseCaseRequest,
} from '@custom-types/use-cases/user/get-all-users-detailed'
import type { UsersRepository } from '@repositories/users-repository'

export class GetAllUsersDetailedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersUseCaseInput: GetAllUsersDetailedUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsersDetailed(getAllUsersUseCaseInput)

    return usersInfo as GetAllUsersCaseResponse
  }
}
