import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import type { AuthenticationAuditRepository } from '@/repositories/authentication-audit-repository'
import type { UsersRepository } from '@/repositories/users-repository'

interface AuthenticateUseCaseRequest {
  emailOrUsername: string
  password: string
  ipAddress?: string
  remotePort?: string
  browser?: string
}

interface AuthenticateUseCaseResponse {
  user: UserWithDetails
}

export class AuthenticateUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authenticationAuditRepository: AuthenticationAuditRepository,
  ) {}

  async execute({
    emailOrUsername,
    password,
    ipAddress,
    remotePort,
    browser,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user =
      await this.usersRepository.findByEmailOrUsername(emailOrUsername)

    const auditAuthenticateObject = {
      browser: browser ?? null,
      ipAddress: ipAddress ?? null,
      remotePort: remotePort ?? null,
      userId: user?.id ?? null,
    }

    if (user === null) {
      await this.authenticationAuditRepository.create({
        ...auditAuthenticateObject,
        status: 'USER_NOT_EXISTS',
      })

      throw new InvalidCredentialsError()
    }

    await this.usersRepository.incrementLoginAttempts(user.id)

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      await this.authenticationAuditRepository.create({
        ...auditAuthenticateObject,
        status: 'INCORRECT_PASSWORD',
      })

      throw new InvalidCredentialsError()
    }

    await this.usersRepository.update(user.id, { lastLogin: new Date() })

    await this.authenticationAuditRepository.create({
      ...auditAuthenticateObject,
      status: 'SUCCESS',
      userId: user.id,
    })

    return { user }
  }
}
