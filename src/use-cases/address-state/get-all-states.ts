import type {
  GetAllStatesUseCaseRequest,
  GetAllStatesUseCaseResponse,
} from '@custom-types/use-cases/address/get-all-states'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllStatesUseCase {
  constructor(
    @inject(tokens.repositories.addressStates)
    private readonly addressesStatesRepository: AddressStatesRepository,
  ) {}

  async execute(getAllStatesUseCaseInput: GetAllStatesUseCaseRequest): Promise<GetAllStatesUseCaseResponse> {
    const addressesInfo = await this.addressesStatesRepository.listAllAddressesStates(getAllStatesUseCaseInput)

    return addressesInfo
  }
}
