import { PrismaAddressesRepository } from '@repositories/prisma/prisma-addresses-repository'
import { GetAllStatesUseCase } from '@use-cases/address/get-all-states'

export function makeGetAllStatesUseCase() {
  const AddressesRepository = new PrismaAddressesRepository()
  const getAllStatesUseCase = new GetAllStatesUseCase(AddressesRepository)

  return getAllStatesUseCase
}
