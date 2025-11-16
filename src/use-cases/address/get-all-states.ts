import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AddressesRepository, AddressStates } from '@repositories/addresses-repository'
import type { GetAllStatesQuerySchemaType } from '@schemas/address/get-all-states-query-schema'

export interface GetAllStatesUseCaseRequest extends GetAllStatesQuerySchemaType {}

export interface GetAllActivityAreasUseCaseResponse extends PaginatedResult<AddressStates[]> {}

export class GetAllStatesUseCase {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async execute(getAllStatesUseCaseInput: GetAllStatesUseCaseRequest): Promise<GetAllActivityAreasUseCaseResponse> {
    const addressesInfo = await this.addressesRepository.listAllAddressesStates(getAllStatesUseCaseInput)

    return addressesInfo
  }
}
