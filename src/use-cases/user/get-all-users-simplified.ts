import type {
  GetAllUsersSimplifiedCaseResponse,
  GetAllUsersUseCaseRequest,
} from '@custom-types/use-cases/user/get-all-users-simplified'
import type { UsersRepository } from '@repositories/users-repository'

export class GetAllUsersSimplifiedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    getAllUsersSimplifiedUseCaseInput: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersSimplifiedCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsersSimplified(getAllUsersSimplifiedUseCaseInput)

    return simplifiedUsersInfo as GetAllUsersSimplifiedCaseResponse
  }
}
