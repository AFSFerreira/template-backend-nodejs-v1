import type { AstrobiologyOrRelatedStartYearType } from '@custom-types/astrobiology-or-related-start-year-type'
import type { BirthDateComparisonType } from '@custom-types/birth-date-comparison-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { GetAllUsersSchemaType } from '@schemas/user/get-all-users-schema'

type GetAllUsersUseCaseRequest = GetAllUsersSchemaType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

interface GetAllUsersCaseResponse {
  data: UserWithDetails[]
  meta: PaginationMetaType
}

export class GetAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    getAllUsersInput: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersCaseResponse> {
    const usersInfo = await this.usersRepository.listAllUsers(getAllUsersInput)

    return usersInfo
  }
}
