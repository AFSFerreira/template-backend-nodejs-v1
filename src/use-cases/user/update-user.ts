import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { UpdateUserBodySchemaType } from '@schemas/user/update-user-body-schema'
import { ensureExists } from '@utils/ensure'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: string
  data: UpdateUserBodySchemaType
}

interface UpdateUserUseCaseResponse {
  user: UserWithDetails
}

export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = ensureExists({
      value: await this.usersRepository.findByPublicId(userId),
      error: new UserNotFoundError()
    })

    const updatedUser = await this.usersRepository.update({
      id: userExists.id,
      data
    })

    return { user: updatedUser }
  }
}

