import type { UserWithDetails } from '@custom-types/user-with-details'
import { env } from '@env/index'
import type { UsersRepository } from '@repositories/users-repository'
import type { UpdateUserBodySchemaType } from '@schemas/user/update-user-body-schema'
import { UserWithSameEmail } from '@use-cases/errors/user/user-with-same-email-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { ensureExists } from '@utils/ensure'
import { hash } from 'bcryptjs'
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
      error: new UserNotFoundError(),
    })

    const userConflictingUpdateInfo = await this.usersRepository.findConflictingUser({
      email: data.user.email,
      username: data.user.username,
    })

    if (userConflictingUpdateInfo) {
      if (userConflictingUpdateInfo.email === data.user.email && userExists.email !== data.user.email) {
        throw new UserWithSameEmail()
      }

      if (userConflictingUpdateInfo.username === data.user.username && userExists.username !== data.user.username) {
        throw new UserWithSameUsername()
      }
    }

    const { password, ...filteredUserUpdateData } = data.user

    const passwordHash = data.user.password
      ? await hash(data.user.password, env.HASH_SALT_ROUNDS)
      : userExists.passwordHash

    const updatedUser = await this.usersRepository.update({
      id: userExists.id,
      data: {
        ...data,
        user: {
          ...filteredUserUpdateData,
          passwordHash,
        },
      },
    })

    return { user: updatedUser }
  }
}
