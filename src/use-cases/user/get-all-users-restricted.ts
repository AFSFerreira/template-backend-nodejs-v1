import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UserWithRestrictedDetails } from '@custom-types/user-with-restricted-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { GetAllUsersRestrictedQuerySchemaType } from '@schemas/user/get-all-users-restricted-query-schema'

type GetAllUsersRestrictedUseCaseRequest = GetAllUsersRestrictedQuerySchemaType

interface GetAllUsersRestrictedCaseResponse {
  data: UserWithRestrictedDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersRestrictedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    getAllUsersRestrictedInput: GetAllUsersRestrictedUseCaseRequest,
  ): Promise<GetAllUsersRestrictedCaseResponse> {
    const restrictedUsersInfo = await this.usersRepository.listAllUsers({
      restricted: true,
      ...getAllUsersRestrictedInput,
    })

    return restrictedUsersInfo as GetAllUsersRestrictedCaseResponse
  }
}
