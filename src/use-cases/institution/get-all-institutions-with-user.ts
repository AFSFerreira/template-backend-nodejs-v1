import type {
  GetAllInstitutionsWithUsersUseCaseRequest,
  GetAllInstitutionsWithUsersUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-institutions-with-user'
import type { InstitutionsRepository } from '@repositories/institutions-repository'

export class GetAllInstitutionsWithUsersUseCase {
  constructor(private readonly institutionsRepository: InstitutionsRepository) {}

  async execute(
    getAllInstitutionsWithUsersUseCaseInput: GetAllInstitutionsWithUsersUseCaseRequest,
  ): Promise<GetAllInstitutionsWithUsersUseCaseResponse> {
    const institutionsInfo = await this.institutionsRepository.listAllInstitutionsWithUsersCount(
      getAllInstitutionsWithUsersUseCaseInput,
    )

    return institutionsInfo
  }
}
