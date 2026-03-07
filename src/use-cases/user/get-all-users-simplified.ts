import type {
  GetAllUsersSimplifiedCaseResponse,
  GetAllUsersUseCaseRequest,
} from '@custom-types/use-cases/user/get-all-users-simplified'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllUsersSimplifiedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    getAllUsersSimplifiedUseCaseInput: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersSimplifiedCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsersSimplified(getAllUsersSimplifiedUseCaseInput)

    return simplifiedUsersInfo as GetAllUsersSimplifiedCaseResponse
  }
}
