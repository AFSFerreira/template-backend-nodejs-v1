import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/output/custom-academic-publication-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import type { GetAllAcademicPublicationsQuerySchemaType } from '@schemas/academic-publication/get-all-academic-publications-query-schema'

interface GetAllAcademicPublicationsUseCaseRequest extends GetAllAcademicPublicationsQuerySchemaType {}

interface GetAllAcademicPublicationsUseCaseResponse
  extends PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]> {}

export class GetAllAcademicPublicationsUseCase {
  constructor(private readonly academicPublicationsRepository: AcademicPublicationsRepository) {}

  async execute(
    getAllAcademicPublicationsUseCaseInput: GetAllAcademicPublicationsUseCaseRequest,
  ): Promise<GetAllAcademicPublicationsUseCaseResponse> {
    const academicPublications = await this.academicPublicationsRepository.listAllAcademicPublications(
      getAllAcademicPublicationsUseCaseInput,
    )

    return academicPublications
  }
}
