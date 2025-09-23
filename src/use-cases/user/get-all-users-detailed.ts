import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UsersRepository } from '@repositories/users-repository'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'

type GetAllUsersDetailedUseCaseRequest = getAllUsersDetailedQuerySchemaType

interface GetAllUsersCaseResponse {
  data: CustomUserWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersDetailedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersUseCaseInput: GetAllUsersDetailedUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsersDetailed(getAllUsersUseCaseInput)

    return usersInfo as GetAllUsersCaseResponse
  }
}
