import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { CheckAvailabilityQuerySchemaType } from '@schemas/user/check-availability-query-schema'
import { MissingCheckAvailabilitiesInput } from '@use-cases/errors/user/missing-email-and-username-error'

type CheckAvailabilityUseCaseRequest = CheckAvailabilityQuerySchemaType

interface CheckAvailabilityUseCaseResponse {
  availabilities: Array<Record<string, boolean>>
}

export class CheckAvailabilityUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    checkAvailabilityUseCaseInput: CheckAvailabilityUseCaseRequest,
  ): Promise<CheckAvailabilityUseCaseResponse> {
    const validCheckInputs = Object.entries(
      checkAvailabilityUseCaseInput,
    ).filter((value) => !!value[1])

    if (validCheckInputs.length === 0) {
      throw new MissingCheckAvailabilitiesInput()
    }

    const availabilitiesPromises: Array<Promise<UserWithDetails | null>> = []
    const availabilitiesName: string[] = []

    if (checkAvailabilityUseCaseInput.email) {
      availabilitiesName.push('email')
      availabilitiesPromises.push(
        this.usersRepository.findBy({
          email: checkAvailabilityUseCaseInput.email,
        }),
      )
    }

    if (checkAvailabilityUseCaseInput.username) {
      availabilitiesName.push('username')
      availabilitiesPromises.push(
        this.usersRepository.findBy({
          username: checkAvailabilityUseCaseInput.username,
        }),
      )
    }

    if (
      checkAvailabilityUseCaseInput.identityType ||
      checkAvailabilityUseCaseInput.identityDocument
    ) {
      availabilitiesName.push('identity')
      availabilitiesPromises.push(
        this.usersRepository.findBy({
          identityType: checkAvailabilityUseCaseInput.identityType,
          identityDocument: checkAvailabilityUseCaseInput.identityDocument,
        }),
      )
    }

    const availabilitiesValues = await Promise.all(availabilitiesPromises)

    const availabilities = availabilitiesName.map((key, idx) => ({
      [key]: availabilitiesValues[idx] === null,
    }))

    return { availabilities }
  }
}
