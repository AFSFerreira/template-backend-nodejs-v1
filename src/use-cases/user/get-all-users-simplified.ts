import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UsersRepository } from '@repositories/users-repository'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'

type GetAllUsersUseCaseRequest = GetAllUsersSimplifiedQuerySchemaType

interface GetAllUsersSimplifiedCaseResponse {
  data: CustomUserWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersSimplifiedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersSimplifiedInput: GetAllUsersUseCaseRequest): Promise<GetAllUsersSimplifiedCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsersSimplified(getAllUsersSimplifiedInput)

    return simplifiedUsersInfo as GetAllUsersSimplifiedCaseResponse
  }
}
