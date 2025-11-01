import type { User } from '@prisma/client'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { emailSchema } from '@schemas/utils/components/email-schema'
import { usernameSchema } from '@schemas/utils/components/username-schema'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/user/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  login: string
  password: string
  ipAddress?: string
  remotePort?: string
  browser?: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

const DUMMY_HASH = 'CR7&YqVb9zXfK2n4uP3tLsWhJcEg1ABvZdTQMiN0oGpUeCyxLr5HaDmZjSXFkwEt'

export class AuthenticateUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly AuthenticationAuditsRepository: AuthenticationAuditsRepository,
  ) {}

  async execute({
    login,
    password,
    ipAddress,
    remotePort,
    browser,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user: User | null = await (async () => {
      switch (true) {
        case emailSchema.safeParse(login).success:
          return await this.usersRepository.findByEmail(login)
        case usernameSchema.safeParse(login).success:
          return await this.usersRepository.findByUsername(login)
        default:
          return null
      }
    })()

    const hashToCompare = user?.passwordHash ?? DUMMY_HASH

    const doesPasswordMatch = await compare(password, hashToCompare)

    const auditAuthenticateObject = {
      browser: browser ?? null,
      ipAddress: ipAddress ?? null,
      remotePort: remotePort ?? null,
      userId: user?.id ?? null,
    }

    if (!user) {
      await this.AuthenticationAuditsRepository.create({
        ...auditAuthenticateObject,
        status: 'USER_NOT_EXISTS',
      })

      throw new InvalidCredentialsError()
    }

    await this.usersRepository.incrementLoginAttempts(user.id)

    if (!doesPasswordMatch) {
      await this.AuthenticationAuditsRepository.create({
        ...auditAuthenticateObject,
        status: 'INCORRECT_PASSWORD',
      })

      throw new InvalidCredentialsError()
    }

    await this.usersRepository.setLastLogin(user.id)

    await this.AuthenticationAuditsRepository.create({
      ...auditAuthenticateObject,
      status: 'SUCCESS',
      userId: user.id,
    })

    return { user }
  }
}
