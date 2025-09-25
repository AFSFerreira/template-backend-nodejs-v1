import { PrismaAddressRepository } from '@repositories/prisma/prisma-address-repository'
import { GetAllStatesUseCase } from '@use-cases/address/get-all-states'

export function makeGetAllStatesUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const getAllStatesUseCase = new GetAllStatesUseCase(addressRepository)

  return getAllStatesUseCase
}
