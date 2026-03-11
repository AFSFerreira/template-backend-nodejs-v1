import type {
  GetAllInternalInstitutionsNamesUseCaseRequest,
  GetAllInternalInstitutionsNamesUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-internal-institutions-names'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllInternalInstitutionsNamesUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(
    query: GetAllInternalInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInternalInstitutionsNamesUseCaseResponse> {
    const institutions = await this.institutionsRepository.listAllInstitutionsNames(query)

    return institutions
  }
}
