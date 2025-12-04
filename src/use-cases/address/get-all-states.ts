import type {
  GetAllStatesUseCaseRequest,
  GetAllStatesUseCaseResponse,
} from '@custom-types/use-cases/address/get-all-states'
import type { AddressesRepository } from '@repositories/addresses-repository'

export class GetAllStatesUseCase {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async execute(getAllStatesUseCaseInput: GetAllStatesUseCaseRequest): Promise<GetAllStatesUseCaseResponse> {
    const addressesInfo = await this.addressesRepository.listAllAddressesStates(getAllStatesUseCaseInput)

    return addressesInfo
  }
}
