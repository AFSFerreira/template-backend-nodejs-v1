import type { AddressRepository } from '@/repositories/address-repository'
import type { Address } from '@prisma/client'
import { UserAlreadyHasAddressError } from '../errors/user-already-has-address-error'

interface CreateAddressUseCaseRequest {
  postalCode: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  houseNumber: string
  userId: string
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute({
    postalCode,
    country,
    state,
    city,
    neighborhood,
    street,
    houseNumber,
    userId,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const userAlreadyHasAddress =
      await this.addressRepository.findBy({ userId })

    if (userAlreadyHasAddress !== null) {
      throw new UserAlreadyHasAddressError()
    }

    const address = await this.addressRepository.create({
      postalCode,
      country,
      state,
      city,
      neighborhood,
      street,
      houseNumber,
      userId,
    })

    return { address }
  }
}
