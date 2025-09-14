import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UserWithSimplifiedDetails } from '@custom-types/user-with-simplified-details'
import { MembershipStatusType } from '@prisma/client'
import type { UsersRepository } from '@repositories/users-repository'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'

type GetAllUsersUseCaseRequest = GetAllUsersSimplifiedQuerySchemaType

interface GetAllUsersSimplifiedCaseResponse {
  data: UserWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersSimplifiedInput: GetAllUsersUseCaseRequest): Promise<GetAllUsersSimplifiedCaseResponse> {
    const simplifiedUsersInfo = await this.usersRepository.listAllUsers({
      ...getAllUsersSimplifiedInput,
      simplified: true,
      membershipStatus: MembershipStatusType.ACTIVE,
    })

    return simplifiedUsersInfo as GetAllUsersSimplifiedCaseResponse
  }
}
