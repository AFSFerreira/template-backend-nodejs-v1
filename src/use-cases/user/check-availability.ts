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
    const identity = checkAvailabilityUseCaseInput.identity

    const checks: Array<[string, () => Promise<boolean>]> = [
      [
        'email',
        async () => !!(await this.usersRepository.findUniqueBy({ email: checkAvailabilityUseCaseInput.email })),
      ],
      [
        'secondaryEmail',
        async () =>
          !!(await this.usersRepository.findUniqueBy({ secondaryEmail: checkAvailabilityUseCaseInput.secondaryEmail })),
      ],
      [
        'username',
        async () =>
          !!(await this.usersRepository.findUniqueBy({
            username: checkAvailabilityUseCaseInput.username,
          })),
      ],
      ...(identity
        ? [
            [
              'identity',
              async () =>
                !!(await this.usersRepository.findUniqueBy({
                  identityType_identityDocument: {
                    identityType: identity.identityType,
                    identityDocument: identity.identityDocument,
                  },
                })),
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
