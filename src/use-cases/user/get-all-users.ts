import type { AstrobiologyOrRelatedStartYearType } from '@/@types/astrobiology-or-related-start-year-type'
import type { BirthDateComparisonType } from '@/@types/birth-date-comparison-type'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { GetAllUsersSchemaType } from '@/http/schemas/user/get-all-users-schema'
import type { UsersRepository } from '@/repositories/users-repository'

type GetAllUsersUseCaseRequest = GetAllUsersSchemaType &
  BirthDateComparisonType &
  AstrobiologyOrRelatedStartYearType

interface GetAllUsersCaseResponse {
  users: UserWithDetails[]
}

export class GetAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    getAllUsersInput: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersCaseResponse> {
    const users = await this.usersRepository.listAllUsers({
      ...getAllUsersInput,
      occupation: getAllUsersInput.occupation,
      educationLevel: getAllUsersInput.educationLevel,
    })

    return { users }
  }
}
