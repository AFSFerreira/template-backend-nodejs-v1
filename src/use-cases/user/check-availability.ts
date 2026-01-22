import type {
  CheckAvailabilityUseCaseRequest,
  CheckAvailabilityUseCaseResponse,
} from '@custom-types/use-cases/user/check-availability'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MissingCheckAvailabilitiesInput } from '@use-cases/errors/user/missing-email-and-username-error'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CheckAvailabilityUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    checkAvailabilityUseCaseInput: CheckAvailabilityUseCaseRequest,
  ): Promise<CheckAvailabilityUseCaseResponse> {
    const { email, username, identity } = checkAvailabilityUseCaseInput

    const checks: Array<[string, () => Promise<boolean>]> = [
      [
        'email',
        async () =>
          !!(await this.usersRepository.findConflictingUser({
            email,
            secondaryEmail: email,
          })),
      ],
      [
        'username',
        async () =>
          !!(await this.usersRepository.findConflictingUser({
            username,
          })),
      ],
      ...(identity
        ? [
            [
              'identity',
              async () =>
                !!(await this.usersRepository.findConflictingUser({ identityType_identityDocument: identity })),
            ] as [string, () => Promise<boolean>],
          ]
        : []),
    ]

    const activeChecks = checks.filter(([key, _]) => key in checkAvailabilityUseCaseInput)

    if (activeChecks.length === 0) {
      throw new MissingCheckAvailabilitiesInput()
    }

    const results = await Promise.all(activeChecks.map(async ([_, fn]) => await fn()))

    const availabilities: Record<string, boolean> = {}

    activeChecks.forEach(([key], idx) => {
      availabilities[key] = !results[idx]
    })

    return { availabilities }
  }
}
