import { PrismaAddressStatesRepository } from '@repositories/prisma/prisma-address-states-repository'
import { GetAllStatesUseCase } from '@use-cases/address-state/get-all-states'

export function makeGetAllStatesUseCase() {
  const AddressStatesRepository = new PrismaAddressStatesRepository()
  const getAllStatesUseCase = new GetAllStatesUseCase(AddressStatesRepository)

  return getAllStatesUseCase
}
