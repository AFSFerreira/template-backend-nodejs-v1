import type { UsersRepository } from '@repositories/users-repository'
import type { CheckAvailabilityQuerySchemaType } from '@schemas/user/check-availability-query-schema'
import { MissingCheckAvailabilitiesInput } from '@use-cases/errors/user/missing-email-and-username-error'

interface CheckAvailabilityUseCaseRequest extends CheckAvailabilityQuerySchemaType {}

interface CheckAvailabilityUseCaseResponse {
  availabilities: Record<string, boolean>
}

export class CheckAvailabilityUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    checkAvailabilityUseCaseInput: CheckAvailabilityUseCaseRequest,
  ): Promise<CheckAvailabilityUseCaseResponse> {
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
      [
        'identity',
        async () =>
          !!(await this.usersRepository.findUniqueBy({
            identityType_identityDocument: {
              identityType: checkAvailabilityUseCaseInput.identity.identityType,
              identityDocument: checkAvailabilityUseCaseInput.identity.identityDocument,
            },
          })),
      ],
    ]

    const activeChecks = checks.filter(([key, _]) => {
      return !!checkAvailabilityUseCaseInput[key as keyof CheckAvailabilityUseCaseResponse]
    })

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
