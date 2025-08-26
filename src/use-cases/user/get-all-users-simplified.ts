import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UserWithSimplifiedDetails } from '@custom-types/user-with-simplified-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-restricted-query-schema'

type GetAllUsersRestrictedUseCaseRequest = GetAllUsersSimplifiedQuerySchemaType

interface GetAllUsersSimplifiedCaseResponse {
  data: UserWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersSimplifiedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    getAllUsersSimplifiedInput: GetAllUsersRestrictedUseCaseRequest,
  ): Promise<GetAllUsersSimplifiedCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsers({
      simplified: true,
      ...getAllUsersSimplifiedInput,
    })

    return simplifiedUsersInfo as GetAllUsersSimplifiedCaseResponse
  }
}
