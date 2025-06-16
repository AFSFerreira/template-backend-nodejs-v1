import type { AddressRepository } from '@/repositories/address-repository'
import type { Address } from '@prisma/client'
import { UserAlreadyHasAddressError } from './errors/user-already-has-address-error'

interface CreateAddressUseCaseRequest {
  houseNumber: string
  street: string
  cityName: string
  postalCode: string
  stateName: string
  countryName: string
  userId: string
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(
    private readonly addressRepository: AddressRepository
  ) {}

  async execute({
    houseNumber,
    street,
    cityName,
    postalCode,
    stateName,
    countryName,
    userId,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const userAlreadyHasAddress = await this.addressRepository.findByUserId(userId)

    if (userAlreadyHasAddress !== null) {
      throw new UserAlreadyHasAddressError()
    }

    const address = await this.addressRepository.create({
        houseNumber,
        street,
        cityName,
        postalCode,
        stateName,
        countryName,
        userId,
    })

    return {
      address
    }
  }
}
