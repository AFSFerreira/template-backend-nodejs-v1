import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { AddressRepository, AddressStates } from '@repositories/address-repository'
import type { GetAllStatesQuerySchemaType } from '@schemas/address/get-all-states-query-schema'

export interface GetAllStatesUseCaseRequest extends GetAllStatesQuerySchemaType {}

export interface GetAllActivityAreasUseCaseResponse {
  data: AddressStates[]
  meta: PaginationMetaType
}

export class GetAllStatesUseCase {
  constructor(private readonly addressesRepository: AddressRepository) {}

  async execute(getAllStatesUseCaseInput: GetAllStatesUseCaseRequest): Promise<GetAllActivityAreasUseCaseResponse> {
    const addressesInfo = await this.addressesRepository.listAllAddressesStates(getAllStatesUseCaseInput)

    return addressesInfo
  }
}
