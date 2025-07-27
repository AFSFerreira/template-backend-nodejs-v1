import type { UserWithDetails } from '@/@types/user-with-details'
import type {
  GetAllUsersQuery,
  UsersRepository,
} from '@/repositories/users-repository'

type GetAllUsersUseCaseRequest = GetAllUsersQuery

interface GetAllUsersCaseResponse {
  users: UserWithDetails[]
}

export class GetAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    request: GetAllUsersUseCaseRequest,
  ): Promise<GetAllUsersCaseResponse> {
    const users = await this.usersRepository.listAllUsers(request)

    return { users }
  }
}
