import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { InstitutionsRepository, InstitutionsUsersCount } from '@repositories/institutions-repository'
import type { GetAllInstitutionsWithUsersQuerySchemaType } from '@schemas/institution/get-all-institutions-with-users-query-schema'

interface GetAllInstitutionsWithUsersUseCaseRequest extends GetAllInstitutionsWithUsersQuerySchemaType {}

interface GetAllInstitutionsWithUsersUseCaseResponse extends PaginatedResult<InstitutionsUsersCount[]> {}

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
