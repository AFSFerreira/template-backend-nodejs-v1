import type { AstrobiologyOrRelatedStartYearType } from '@custom-types/astrobiology-or-related-start-year-type'
import type { BirthDateComparisonType } from '@custom-types/birth-date-comparison-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { getAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'

type GetAllUsersDetailedUseCaseRequest = getAllUsersDetailedQuerySchemaType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

interface GetAllUsersCaseResponse {
  data: UserWithDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersDetailedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(getAllUsersInput: GetAllUsersDetailedUseCaseRequest): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsers({
      ...getAllUsersInput,
      simplified: true,
    })

    return usersInfo as GetAllUsersCaseResponse
  }
}
