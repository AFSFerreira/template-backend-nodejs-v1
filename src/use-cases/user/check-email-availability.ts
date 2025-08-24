import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import type { CheckAvailabilityQuerySchemaType } from '@schemas/user/check-availability-query-schema'
import { MissingCheckAvailabilitiesInput } from '@use-cases/errors/missing-email-and-username-error'

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

    const availabilitiesName: string[] = []
    const availabilitiesPromises: Array<Promise<UserWithDetails | null>> = []

    validCheckInputs.forEach((checkInput) => {
      availabilitiesName.push(checkInput[0])
      availabilitiesPromises.push(
        this.usersRepository.findBy({ [checkInput[0]]: checkInput[1] }),
      )
    })

    const availabilitiesValues = await Promise.all(availabilitiesPromises)

    const availabilities = availabilitiesName.map((key, idx) => ({
      [key]: availabilitiesValues[idx] === null,
    }))

    return { availabilities }
  }
}
