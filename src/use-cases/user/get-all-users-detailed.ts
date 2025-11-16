import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/output/custom-user-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { UsersRepository } from '@repositories/users-repository'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'

interface GetAllUsersDetailedUseCaseRequest extends getAllUsersDetailedQuerySchemaType {}

interface GetAllUsersCaseResponse extends PaginatedResult<CustomUserWithSimplifiedDetails[]> {}

export class GetAllUsersDetailedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersUseCaseInput: GetAllUsersDetailedUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsersDetailed(getAllUsersUseCaseInput)

    return usersInfo as GetAllUsersCaseResponse
  }
}
