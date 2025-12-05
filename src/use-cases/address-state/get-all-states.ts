import type {
  GetAllStatesUseCaseRequest,
  GetAllStatesUseCaseResponse,
} from '@custom-types/use-cases/address/get-all-states'
import type { AddressStatesRepository } from '@repositories/address-states-repository'

export class GetAllStatesUseCase {
  constructor(private readonly addressesStatesRepository: AddressStatesRepository) {}

  async execute(getAllStatesUseCaseInput: GetAllStatesUseCaseRequest): Promise<GetAllStatesUseCaseResponse> {
    const addressesInfo = await this.addressesStatesRepository.listAllAddressesStates(getAllStatesUseCaseInput)

    return addressesInfo
  }
}
