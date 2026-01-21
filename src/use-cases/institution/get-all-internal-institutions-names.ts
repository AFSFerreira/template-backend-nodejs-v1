import type {
  GetAllInternalInstitutionsNamesUseCaseRequest,
  GetAllInternalInstitutionsNamesUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-internal-institutions-names'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllInternalInstitutionsNamesUseCase {
  constructor(
    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(
    query: GetAllInternalInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInternalInstitutionsNamesUseCaseResponse> {
    const institutions = await this.institutionsRepository.listAllInstitutionsNames(query)

    return institutions
  }
}
