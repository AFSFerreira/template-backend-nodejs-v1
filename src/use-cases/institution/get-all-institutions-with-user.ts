import type {
  GetAllInstitutionsWithUsersUseCaseRequest,
  GetAllInstitutionsWithUsersUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-institutions-with-user'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllInstitutionsWithUsersUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(
    getAllInstitutionsWithUsersUseCaseInput: GetAllInstitutionsWithUsersUseCaseRequest,
  ): Promise<GetAllInstitutionsWithUsersUseCaseResponse> {
    const institutionsInfo = await this.institutionsRepository.listAllInstitutionsWithUsersCount(
      getAllInstitutionsWithUsersUseCaseInput,
    )

    return institutionsInfo
  }
}
