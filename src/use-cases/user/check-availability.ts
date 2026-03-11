import type {
  CheckAvailabilityUseCaseRequest,
  CheckAvailabilityUseCaseResponse,
} from '@custom-types/use-cases/user/check-availability'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { HashService } from '@services/hashes/hash-service'
import { MissingCheckAvailabilitiesInput } from '@use-cases/errors/user/missing-email-and-username-error'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CheckAvailabilityUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
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
                !!(await this.usersRepository.findConflictingUser({
                  identity: {
                    identityType: identity.identityType,
                    identityDocumentBlindIndex: this.hashService.generateBlindIndex(identity.identityDocument),
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

    for (const [idx, [key]] of activeChecks.entries()) {
      availabilities[key] = !results[idx]
    }

    return { availabilities }
  }
}
